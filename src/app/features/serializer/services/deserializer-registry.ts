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
import { Version } from '../../../shared/models/version';
import { InputString } from '../../../shared/directives/arguments/input-string';
import { InputVersion } from '../../../shared/directives/arguments/input-version';
import { InputLicense } from '../../../shared/directives/arguments/input-license';
import { InputLanguages } from '../../../shared/directives/arguments/input-languages';
import { CMakeProjectTopLevelIncludesVariable } from '../../variables/components/cmake-project-top-level-includes-variable';
import { InputFiles } from '../../../shared/directives/arguments/input-files';
import { DataToCMakeService } from '../../cmake-project/services/data-to-cmake-service';

interface ArgumentParser {
  name: string;
  component: Type<CMakeComponentInterface<CMakeFeatureInterface<unknown>>>;
}

interface CommandParser {
  firstArgument?: string;
  component: Type<CMakeComponentInterface<CMakeFeatureInterface<unknown>>>;
  arguments?: Map<string, ArgumentParser>;
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
  private dataToCMakeService = inject(DataToCMakeService);

  private readonly commandMapping = new Map<string, CommandParser[]>([
    [
      'project',
      [
        {
          component: ProjectCommand,
          arguments: new Map([
            ['', { name: 'name', component: ProjectNameArgument }],
            ['VERSION', { name: 'version', component: ProjectVersionArgument }],
            [
              'COMPAT_VERSION',
              {
                name: 'compatVersion',
                component: ProjectCompatVersionArgument,
              },
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
    ],
    [
      'set',
      [
        {
          firstArgument: 'CMAKE_PROJECT_TOP_LEVEL_INCLUDES',
          component: CMakeProjectTopLevelIncludesVariable,
        },
      ],
    ],
  ]);

  private parseStrArguments(argsStr: string): string[] {
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

  private parseStrCommands(lines: string[]): CMakeCommand[] {
    const commands: CMakeCommand[] = [];
    let buffer = '';

    for (let line of lines) {
      // Remove comments
      const commentIndex = line.indexOf('#');
      if (commentIndex !== -1) {
        line = line.substring(0, commentIndex);
      }

      buffer = `${buffer}${line} `;

      // Parse all complete commands in buffer
      let pos = 0;
      while (pos < buffer.length) {
        // Skip whitespace
        while (pos < buffer.length && /\s/u.test(buffer[pos])) {
          pos += 1;
        }
        if (pos >= buffer.length) {
          break;
        }

        // Extract command name
        const nameStart = pos;
        while (pos < buffer.length && /\w/u.test(buffer[pos])) {
          pos += 1;
        }
        if (pos >= buffer.length) {
          break;
        }

        const name = buffer.substring(nameStart, pos);

        // Skip whitespace
        while (pos < buffer.length && /\s/u.test(buffer[pos])) {
          pos += 1;
        }
        if (pos >= buffer.length || buffer[pos] !== '(') {
          break;
        }

        // Skip '('
        pos += 1;

        // Find matching ')'
        let depth = 1;
        const argsStart = pos;
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
            if (buffer[pos] === '(') {
              depth += 1;
            }
            if (buffer[pos] === ')') {
              depth -= 1;
            }
            pos += 1;
          }
        }

        // Incomplete command
        if (depth > 0) {
          break;
        }

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private setArgument(component: any, field: string, value: string) {
    for (const comp of [component, component[field]]) {
      if ('enabled' in comp) {
        comp.enabled = true;
      }
      if (comp instanceof InputString) {
        comp.value = value;
        return;
      } else if (comp instanceof InputVersion) {
        comp.value = new Version(value);
        return;
      } else if (comp instanceof InputLicense) {
        comp.value = value;
        return;
      } else if (comp instanceof InputLanguages) {
        comp.value = value;
        return;
      } else if (comp instanceof InputFiles) {
        comp.value = this.dataToCMakeService.filesToArrayString(value);
        return;
      }
    }

    console.log(`Failed to set field ${field} with setArgument ${value}`);
    console.log(component);
  }

  private cmakeCommandToComponent(
    command: CMakeCommand,
    parentContextInjector: Injector
  ):
    | ComponentRef<CMakeComponentInterface<CMakeFeatureInterface<unknown>>>
    | undefined {
    const commandMappingI = this.commandMapping.get(command.name);
    // Unknown command
    if (commandMappingI === undefined) {
      console.log(`Unknown command ${command.name}`);
      return undefined;
    }

    // Some component depend on command name and its first argument
    // set(CMAKE_var...) or file(READ...) / file(CONFIGURE...).
    let commandComponent:
      | ComponentRef<CMakeComponentInterface<CMakeFeatureInterface<unknown>>>
      | undefined;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let anyComponent: any;
    let argsComponent: CommandParser | undefined;

    const newComponent = (commandParser: CommandParser) => {
      argsComponent = commandParser;
      commandComponent = createComponent(argsComponent.component, {
        environmentInjector: this.envInjector,
        elementInjector: parentContextInjector,
      });
      commandComponent.changeDetectorRef.detectChanges();
      anyComponent = commandComponent.instance;

      if (argsComponent.arguments !== undefined) {
        for (const [_, value] of argsComponent.arguments) {
          if ('enabled' in anyComponent[value.name]) {
            anyComponent[value.name].enabled = false;
          }
        }
      }
    };

    if (
      commandMappingI.length === 1 &&
      commandMappingI[0].firstArgument === undefined
    ) {
      newComponent(commandMappingI[0]);
    }

    // Init variables
    let currentArgumentName = '';
    let currentArgumentValue = '';
    for (const element of command.args) {
      // If undefined, it's a component that needs command name and its first argument.
      if (commandComponent === undefined) {
        for (const commandI of commandMappingI) {
          if (commandI.firstArgument === undefined) {
            console.log(`${command.name} should have a firstArgument`);
            continue;
          }
          if (commandI.firstArgument === element) {
            newComponent(commandI);
          } else {
            console.log('Failed to found commandMappingI');
          }
        }
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (commandComponent === undefined) {
          console.log(
            `Failed to found component for ${command.name} / ${element}.`
          );
        }
        // Go to the next argument.
        continue;
      }
      if (argsComponent === undefined) {
        console.log(
          `Failed to found component for ${command.name} / ${element}.`
        );
        continue;
      }

      const argumentParser = argsComponent.arguments?.get(element);
      // Argument value
      if (
        argsComponent.arguments === undefined ||
        argumentParser === undefined
      ) {
        if (currentArgumentValue === '') {
          currentArgumentValue = element;
        } else {
          currentArgumentValue = `${currentArgumentValue} ${element}`;
        }
      }
      // Argument name
      else {
        const argumentField = argsComponent.arguments.get(currentArgumentName);
        const argumentFieldName =
          argumentField === undefined ? '' : argumentField.name;
        this.setArgument(anyComponent, argumentFieldName, currentArgumentValue);
        currentArgumentName = element;
        currentArgumentValue = '';
      }
    }
    if (argsComponent === undefined) {
      console.log(`Failed to found component for ${command.name}.`);
      return commandComponent;
    }

    const argumentParser = argsComponent.arguments?.get(currentArgumentName);
    // Argument value
    if (argsComponent.arguments === undefined || argumentParser === undefined) {
      return commandComponent;
    }

    const argumentField = argsComponent.arguments.get(currentArgumentName);
    const argumentFieldName =
      argumentField === undefined ? '' : argumentField.name;
    this.setArgument(anyComponent, argumentFieldName, currentArgumentValue);

    if (commandComponent === undefined) {
      console.log(`Failed to found component for ${command.name}.`);
      return commandComponent;
    }
    return commandComponent;
  }

  private cmakeCommandsToComponent(
    commands: CMakeCommand[],
    parentContextInjector: Injector
  ): ComponentRef<CMakeComponentInterface<CMakeFeatureInterface<unknown>>>[] {
    const retval: ComponentRef<
      CMakeComponentInterface<CMakeFeatureInterface<unknown>>
    >[] = [];
    for (const command of commands) {
      const component = this.cmakeCommandToComponent(
        command,
        parentContextInjector
      );
      if (component !== undefined) {
        retval.push(component);
      }
    }
    return retval;
  }

  parse(
    lines: string[],
    parentContextInjector: Injector
  ): ComponentRef<CMakeComponentInterface<CMakeFeatureInterface<unknown>>>[] {
    const cmakeCommands = this.parseStrCommands(lines);

    return this.cmakeCommandsToComponent(cmakeCommands, parentContextInjector);
  }
}
