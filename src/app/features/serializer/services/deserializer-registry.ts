import { Injectable, Type } from '@angular/core';
import { CMakeComponentInterface } from '../../cmake-project/interfaces/cmake-component-interface';
import { CMakeFeatureInterface } from '../../commands/services/cmake-feature-interface';
import { ProjectCommand } from '../../commands/components/project-command';

interface ArgumentParser {
  prefix: string;
  component: Type<CMakeComponentInterface<CMakeFeatureInterface<unknown>>>;
}

interface CommandParser {
  prefix: string;
  component: Type<CMakeComponentInterface<CMakeFeatureInterface<unknown>>>;
  arguments: ArgumentParser[];
}

interface CMakeCommand {
  name: string;
  args: string[];
  line: number;
}

@Injectable({
  providedIn: 'root',
})
export class DeserializerRegistry {
  private readonly commands: CommandParser[] = [
    { prefix: 'project', component: ProjectCommand, arguments: [] },
  ];

  parseArguments(argsStr: string): string[] {
    const args: string[] = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < argsStr.length; i++) {
      const char = argsStr[i];

      if (char === '\\' && i + 1 < argsStr.length) {
        current += argsStr[++i];
      } else if (char === '"') {
        inQuotes = !inQuotes;
      } else if (/\s/.test(char) && !inQuotes) {
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

  parse(lines: string[]): CMakeCommand[] {
    const commands: CMakeCommand[] = [];
    let buffer = '';

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];

      // Remove comments
      const commentIndex = line.indexOf('#');
      if (commentIndex !== -1) {
        line = line.substring(0, commentIndex);
      }

      buffer += line + ' ';

      // Parse all complete commands in buffer
      let pos = 0;
      while (pos < buffer.length) {
        // Skip whitespace
        while (pos < buffer.length && /\s/.test(buffer[pos])) pos++;
        if (pos >= buffer.length) break;

        // Extract command name
        const nameStart = pos;
        while (pos < buffer.length && /\w/.test(buffer[pos])) pos++;
        if (pos >= buffer.length) break;

        const name = buffer.substring(nameStart, pos);

        // Skip whitespace
        while (pos < buffer.length && /\s/.test(buffer[pos])) pos++;
        if (pos >= buffer.length || buffer[pos] !== '(') break;

        pos++; // Skip '('

        // Find matching ')'
        let depth = 1;
        const argsStart = pos;
        while (pos < buffer.length && depth > 0) {
          if (buffer[pos] === '"') {
            pos++;
            while (pos < buffer.length && buffer[pos] !== '"') {
              if (buffer[pos] === '\\') pos++;
              pos++;
            }
            pos++;
          } else {
            if (buffer[pos] === '(') depth++;
            if (buffer[pos] === ')') depth--;
            pos++;
          }
        }

        if (depth > 0) break; // Incomplete command

        const argsStr = buffer.substring(argsStart, pos - 1);
        const args = this.parseArguments(argsStr);
        commands.push({ name, args, line: i + 1 });

        buffer = buffer.substring(pos);
        pos = 0;
      }

      buffer = buffer.trimStart();
    }

    return commands;
  }
}
