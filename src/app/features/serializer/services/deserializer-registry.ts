import {
  ComponentRef,
  createComponent,
  EnvironmentInjector,
  inject,
  Injectable,
  Injector,
  Type,
} from '@angular/core';
import { CMakeComponentInterface } from '../../cmake-project/interfaces/cmake-component-interface';
import { CMakeFeatureInterface } from '../../commands/services/cmake-feature-interface';
import { ProjectCommand } from '../../commands/components/project-command';
import { ProjectNameArgument } from '../../arguments/components/project-name-argument';
import { ProjectVersionArgument } from '../../arguments/components/project-version-argument';
import { ProjectCompatVersionArgument } from '../../arguments/components/project-compat-version-argument';
import { ProjectSpdxLicenseArgument } from '../../arguments/components/project-spdx-license-argument';
import { ProjectDescriptionArgument } from '../../arguments/components/project-description-argument';
import { ProjectHomepageUrlArgument } from '../../arguments/components/project-homepage-url-argument';
import { ProjectLanguagesArgument } from '../../arguments/components/project-languages-argument';
import { ValidatorInterface } from '../../../shared/interfaces/validator-interface';
import { InputProjectCommand } from '../../commands/directives/input-project-command';
import { Version } from '../../../shared/models/version';
import { InputString } from '../../../shared/directives/arguments/input-string';
import { InputVersion } from '../../../shared/directives/arguments/input-version';
import { InputLicense } from '../../../shared/directives/arguments/input-license';
import { InputLanguages } from '../../../shared/directives/arguments/input-languages';

interface ArgumentParser {
  name: string;
  component: Type<CMakeComponentInterface<CMakeFeatureInterface<unknown>>>;
}

interface CommandParser {
  component: Type<CMakeComponentInterface<CMakeFeatureInterface<unknown>>>;
  arguments: Map<string, ArgumentParser>;
}

interface CMakeCommand {
  name: string;
  args: string[];
}

@Injectable({
  providedIn: 'root',
})
export class DeserializerRegistry {
  private envInjector = inject(EnvironmentInjector);

  private readonly commandMapping: Map<string, CommandParser> = new Map([
    [
      'project',
      {
        component: ProjectCommand,
        arguments: new Map([
          ['', { name: 'name', component: ProjectNameArgument }],
          ['VERSION', { name: 'version', component: ProjectVersionArgument }],
          [
            'COMPAT_VERSION',
            { name: 'compatVersion', component: ProjectCompatVersionArgument },
          ],
          [
            'SPDX_LICENSE',
            { name: 'spdxLicense', component: ProjectSpdxLicenseArgument },
          ],
          [
            'DESCRIPTION',
            { name: 'description', component: ProjectDescriptionArgument },
          ],
          [
            'HOMEPAGE_URL',
            { name: 'homepageUrl', component: ProjectHomepageUrlArgument },
          ],
          [
            'LANGUAGES',
            { name: 'languages', component: ProjectLanguagesArgument },
          ],
        ]),
      },
    ],
  ]);

  private parseStrArguments(argsStr: string): string[] {
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

  private parseStrCommands(lines: string[]): CMakeCommand[] {
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
        const args = this.parseStrArguments(argsStr);
        commands.push({ name, args });

        buffer = buffer.substring(pos);
        pos = 0;
      }

      buffer = buffer.trimStart();
    }

    return commands;
  }

  private setArgument(component: any, value: string) {
    if (component instanceof InputString) {
      (component as InputString).value = value;
    } else if (component instanceof InputVersion) {
      (component as InputVersion).value = new Version(value);
    } else if (component instanceof InputLicense) {
      (component as InputLicense).value = value;
    } else if (component instanceof InputLanguages) {
      (component as InputLanguages).value = value;
    }
  }

  private cmakeCommandToComponent(
    commands: CMakeCommand[],
    parentContextInjector: Injector
  ): ComponentRef<CMakeComponentInterface<CMakeFeatureInterface<unknown>>>[] {
    const retval: ComponentRef<
      CMakeComponentInterface<CMakeFeatureInterface<unknown>>
    >[] = [];
    commands.forEach((command) => {
      const newCommand = createComponent(
        this.commandMapping.get(command.name)!.component,
        {
          environmentInjector: this.envInjector,
          elementInjector: parentContextInjector,
        }
      );
      newCommand.changeDetectorRef.detectChanges();
      const anyCommand = newCommand.instance as any;
      let instance = newCommand.instance as ProjectCommand;
      let argument = '';
      let value = '';
      command.args.forEach((element) => {
        const argumentParser = this.commandMapping
          .get(command.name)!
          .arguments.get(element);
        if (argumentParser === undefined) {
          if (value === '') {
            value = element;
          } else {
            value = value + ' ' + element;
          }
        } else {
          this.setArgument(
            anyCommand[
              this.commandMapping.get(command.name)!.arguments.get(argument)!
                .name
            ],
            value
          );
          argument = element;
          value = '';
        }
      });
      this.setArgument(
        anyCommand[
          this.commandMapping.get(command.name)!.arguments.get(argument)!.name
        ],
        value
      );
      retval.push(newCommand);
    });
    return retval;
  }

  parse(
    lines: string[],
    parentContextInjector: Injector
  ): ComponentRef<CMakeComponentInterface<CMakeFeatureInterface<unknown>>>[] {
    const cmakeCommands = this.parseStrCommands(lines);

    return this.cmakeCommandToComponent(cmakeCommands, parentContextInjector);
  }
}
