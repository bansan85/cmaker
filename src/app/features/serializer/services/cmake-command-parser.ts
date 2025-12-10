import { Injectable } from '@angular/core';
import { CMakeCommand } from '../models/cmake-command';

const enum ParserStatus {
  SEEKING_START_OF_COMMAND_NAME,
  SEEKING_END_OF_COMMAND_NAME,
  SEEKING_START_ARGUMENTS,
}

@Injectable({
  providedIn: 'root',
})
export class CMakeCommandParser {
  public splitArguments(argsStr: string): string[] {
    const args: string[] = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < argsStr.length; i += 1) {
      const char = argsStr[i];

      if (char === '\\' && i + 1 < argsStr.length) {
        i += 1;
        current += argsStr[i];
      } else if (char === '"') {
        inQuotes = !inQuotes;
      } else if (/\s/u.test(char) && !inQuotes) {
        if (current) {
          args.push(current);
          current = '';
        }
      } else {
        current += char;
      }
    }

    if (current) {
      args.push(current);
    }

    return args;
  }

  public findMatchingChar(
    buffer: string,
    char: '()' | '{}' | '[]' | '<>',
    start?: number
  ): number | null {
    start ??= 0;

    const [startChar, endChar] = char;

    let pos = start;

    if (buffer[pos] !== startChar) {
      throw new Error(
        `${buffer} should start with ${startChar} at position ${pos}`
      );
    }

    // Find matching ')'
    let depth = 1;
    pos += 1;
    while (pos < buffer.length && depth > 0) {
      if (buffer[pos] === '"') {
        pos += 1;
        while (pos < buffer.length && buffer[pos] !== '"') {
          if (buffer[pos] === '\\') {
            pos += 1;
          }
          pos += 1;
        }
        pos += 1;
      } else {
        if (buffer[pos] === startChar) {
          depth += 1;
        }
        if (buffer[pos] === endChar) {
          depth -= 1;
        }
        pos += 1;
      }
    }

    if (depth === 0) {
      return pos;
    } else {
      return null;
    }
  }

  removeComment(buffer: string): string {
    // Find matching ')'
    let pos = 0;
    while (pos < buffer.length) {
      if (buffer[pos] === '"') {
        pos += 1;
        while (pos < buffer.length && buffer[pos] !== '"') {
          if (buffer[pos] === '\\') {
            pos += 1;
          }
          pos += 1;
        }
        pos += 1;
      } else {
        if (buffer[pos] === '#') {
          return buffer.substring(0, pos);
        }
        pos += 1;
      }
    }
    return buffer.substring(0, pos);
  }

  *parseStrCommands(lines: string[]): Generator<CMakeCommand> {
    let buffer = '';
    let commandNameStart: number | null = null;
    let commandName: string | null = null;
    let parserStatus = ParserStatus.SEEKING_START_OF_COMMAND_NAME;
    let pos = 0;
    for (const line of lines) {
      buffer = this.removeComment(`${buffer}${line} `);

      // Parse all complete commands in buffer
      buffer_loop: for (; pos < buffer.length; pos += 1) {
        // Skip whitespace
        if (/\s/u.test(buffer[pos])) {
          continue;
        }

        switch (parserStatus) {
          case ParserStatus.SEEKING_START_OF_COMMAND_NAME: {
            if (!/\w/u.test(buffer[pos])) {
              console.log(
                `Invalid data ${buffer} at position ${pos}. Expected '0-9A-Za-z_'`
              );
              buffer = buffer.substring(0, pos);
              parserStatus = ParserStatus.SEEKING_START_OF_COMMAND_NAME;
              break buffer_loop;
            }

            commandNameStart = pos;

            parserStatus = ParserStatus.SEEKING_END_OF_COMMAND_NAME;

            break;
          }
          case ParserStatus.SEEKING_END_OF_COMMAND_NAME: {
            if (commandNameStart === null) {
              throw new Error();
            }
            if (/\w/u.test(buffer[pos])) {
              continue;
            }
            commandName = buffer.substring(commandNameStart, pos);

            parserStatus = ParserStatus.SEEKING_START_ARGUMENTS;
            pos -= 1;

            break;
          }
          case ParserStatus.SEEKING_START_ARGUMENTS: {
            if (commandName === null) {
              throw new Error();
            }
            if (buffer[pos] !== '(') {
              console.log(
                `Invalid data ${buffer} at position ${pos}. Expected '('.`
              );
              buffer = buffer.substring(0, pos);
              parserStatus = ParserStatus.SEEKING_START_OF_COMMAND_NAME;
              break buffer_loop;
            }
            const argsStart = pos;

            const argsEnd = this.findMatchingChar(buffer, '()', pos);

            // Need next line to have all arguments.
            if (argsEnd === null) {
              break buffer_loop;
            }

            const argsStr = buffer.substring(argsStart + 1, argsEnd - 2);
            const args = this.splitArguments(argsStr);
            yield { name: commandName, args };

            buffer = buffer.substring(argsEnd);
            pos = 0;
            commandNameStart = null;
            commandName = null;

            parserStatus = ParserStatus.SEEKING_START_OF_COMMAND_NAME;

            break;
          }
        }
      }
    }
  }
}
