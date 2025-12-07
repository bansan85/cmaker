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
import { CMakeMsvcRuntimeLibraryVariable } from '../../variables/components/cmake-msvc-runtime-library-variable';
import { InputCheckbox } from '../../../shared/directives/arguments/input-checkbox';
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

  private readonly commandMapping: Map<string, CommandParser[]> = new Map([
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

  private setArgument(component: any, field: string, value: string) {
    for (let comp of [component, component[field]]) {
      if (comp instanceof InputString) {
        (comp as InputString).value = value;
        return;
      } else if (comp instanceof InputVersion) {
        (comp as InputVersion).value = new Version(value);
        return;
      } else if (comp instanceof InputLicense) {
        (comp as InputLicense).value = value;
        return;
      } else if (comp instanceof InputLanguages) {
        (comp as InputLanguages).value = value;
        return;
      } else if (comp instanceof InputFiles) {
        (comp as InputFiles).value =
          this.dataToCMakeService.filesToArrayString(value);
        return;
      }
    }

    console.log(`Failed to set field ${field} with setArgument ${value}`);
    console.log(component);
  }

  private cmakeCommandToComponent(
    commands: CMakeCommand[],
    parentContextInjector: Injector
  ): ComponentRef<CMakeComponentInterface<CMakeFeatureInterface<unknown>>>[] {
    const retval: ComponentRef<
      CMakeComponentInterface<CMakeFeatureInterface<unknown>>
    >[] = [];
    commands.forEach((command) => {
      const commandMappingI = this.commandMapping.get(command.name);
      // Unknown command
      if (commandMappingI === undefined) {
        console.log(`Unknown command ${command.name}`);
        return;
      }

      // Some component depend on command name and its first argument
      // set(CMAKE_var...) or file(READ...) / file(CONFIGURE...).
      let commandComponent:
        | ComponentRef<CMakeComponentInterface<CMakeFeatureInterface<unknown>>>
        | undefined;
      let anyComponent: any | undefined;
      let argsComponent: CommandParser | undefined;
      if (
        commandMappingI.length === 1 &&
        commandMappingI[0].firstArgument === undefined
      ) {
        argsComponent = commandMappingI[0];
        commandComponent = createComponent(argsComponent.component, {
          environmentInjector: this.envInjector,
          elementInjector: parentContextInjector,
        });
        commandComponent.changeDetectorRef.detectChanges();
        anyComponent = commandComponent.instance as any;
      }

      // Init variables
      let currentArgumentName = '';
      let currentArgumentValue = '';
      command.args.forEach((element) => {
        // If undefined, it's a component that needs command name and its first argument.
        if (commandComponent === undefined) {
          commandMappingI.forEach((commandI) => {
            if (commandI.firstArgument! === element) {
              argsComponent = commandI;
              commandComponent = createComponent(commandI.component, {
                environmentInjector: this.envInjector,
                elementInjector: parentContextInjector,
              });
              commandComponent.changeDetectorRef.detectChanges();
              anyComponent = commandComponent.instance as any;
            } else {
              console.log('Failed to found commandMappingI');
            }
          });
          if (commandComponent === undefined) {
            console.log(
              `Failed to found component for ${command.name} / ${element}.`
            );
          }
          // Go to the next element.
          return;
        }
        if (argsComponent === undefined) {
          console.log(
            `Failed to found component for ${command.name} / ${element}.`
          );
          return;
        }

        const argumentParser = argsComponent.arguments?.get(element);
        // Argument value
        if (argumentParser === undefined) {
          if (currentArgumentValue === '') {
            currentArgumentValue = element;
          } else {
            currentArgumentValue = currentArgumentValue + ' ' + element;
          }
        }
        // Argument name
        else {
          this.setArgument(
            anyComponent,
            argsComponent.arguments?.get(currentArgumentName)!.name ?? '',
            currentArgumentValue
          );
          currentArgumentName = element;
          currentArgumentValue = '';
        }
      });
      if (argsComponent === undefined) {
        console.log(`Failed to found component for ${command.name}.`);
        return;
      }
      this.setArgument(
        anyComponent,
        argsComponent.arguments?.get(currentArgumentName)!.name ?? '',
        currentArgumentValue
      );
      if (commandComponent === undefined) {
        console.log(`Failed to found component for ${command.name}.`);
        return;
      }
      retval.push(commandComponent);
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
