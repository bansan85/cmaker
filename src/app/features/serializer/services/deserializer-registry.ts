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
  private setArgument(
    component: any,
    args: Map<string, ArgumentParser>,
    field: string,
    value: string
  ) {
    const argumentField = args.get(field);
    const argumentFieldName =
      argumentField === undefined ? '' : argumentField.name;
    for (const comp of [component, component[argumentFieldName]]) {
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

  private getCommandParserFromName(
    commandName: string,
    firstArgument: string | undefined
  ): CommandParser | undefined {
    const commandMappingI = this.commandMapping.get(commandName);
    if (commandMappingI === undefined) {
      console.log(`Unknown command ${commandName}`);
      return undefined;
    }
    if (
      commandMappingI.length === 1 &&
      commandMappingI[0].firstArgument === undefined
    ) {
      return commandMappingI[0];
    } else if (firstArgument === undefined) {
      console.log(`${commandName} should have a firstArgument`);
      return undefined;
    } else {
      for (const commandI of commandMappingI) {
        if (commandI.firstArgument === undefined) {
          console.log(`${commandName} should have a firstArgument`);
          continue;
        }
        if (commandI.firstArgument === firstArgument) {
          return commandI;
        }
      }
      console.log(`Unknown command ${commandName} / ${firstArgument}`);
      return undefined;
    }
  }

  private cmakeCommandToComponent(
    command: CMakeCommand,
    parentContextInjector: Injector
  ):
    | ComponentRef<CMakeComponentInterface<CMakeFeatureInterface<unknown>>>
    | undefined {
    const commandParser = this.getCommandParserFromName(
      command.name,
      command.args[0]
    );
    if (commandParser === undefined) {
      console.log(`Unknown command ${command.name}`);
      return undefined;
    }

    let commandComponent = createComponent(commandParser.component, {
      environmentInjector: this.envInjector,
      elementInjector: parentContextInjector,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let anyComponent: any = commandComponent.instance;

    commandComponent.changeDetectorRef.detectChanges();

    if (commandParser.arguments !== undefined) {
      for (const [_, value] of commandParser.arguments) {
        if ('enabled' in anyComponent[value.name]) {
          anyComponent[value.name].enabled = false;
        }
      }
    }

    let currentArgumentName = '';
    let currentArgumentValue = '';
    const effectiveArgs = commandParser.firstArgument
      ? command.args.slice(1)
      : command.args;
    for (const element of effectiveArgs) {
      const argumentParser = commandParser.arguments?.get(element);
      // Argument value
      if (
        commandParser.arguments === undefined ||
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
        this.setArgument(
          anyComponent,
          commandParser.arguments,
          currentArgumentName,
          currentArgumentValue
        );
        currentArgumentName = element;
        currentArgumentValue = '';
      }
    }

    if (commandParser.arguments === undefined) {
      return commandComponent;
    }
    const argumentParser = commandParser.arguments.get(currentArgumentName);
    if (argumentParser === undefined) {
      return commandComponent;
    }

    // Argument value
    this.setArgument(
      anyComponent,
      commandParser.arguments,
      currentArgumentName,
      currentArgumentValue
    );

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
