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
import { CMakeCommandParser } from './cmake-command-parser';
import { CMakeCommand } from '../models/cmake-command';

interface ArgumentParser {
  name: string;
  component: Type<CMakeComponentInterface<CMakeFeatureInterface<unknown>>>;
}

interface CommandParser {
  firstArgument?: string;
  component: Type<CMakeComponentInterface<CMakeFeatureInterface<unknown>>>;
  arguments?: Map<string, ArgumentParser>;
}

@Injectable({
  providedIn: 'root',
})
export class DeserializerRegistry {
  private envInjector = inject(EnvironmentInjector);
  private dataToCMakeService = inject(DataToCMakeService);
  private cmakeCommandParser = inject(CMakeCommandParser);

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

  parse(
    lines: string[],
    parentContextInjector: Injector
  ): ComponentRef<CMakeComponentInterface<CMakeFeatureInterface<unknown>>>[] {
    return Array.from(this.cmakeCommandParser.parseStrCommands(lines))
      .map((x) => this.cmakeCommandToComponent(x, parentContextInjector))
      .filter((x) => x !== undefined);
  }
}
