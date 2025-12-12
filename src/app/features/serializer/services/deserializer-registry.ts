import {
  ComponentRef,
  createComponent,
  EnvironmentInjector,
  inject,
  Injectable,
  Injector,
} from '@angular/core';
import { CMakeComponentInterface } from '../../cmake-project/interfaces/cmake-component-interface';
import { CMakeFeatureInterface } from '../../commands/services/cmake-feature-interface';
import { Version } from '../../../shared/models/version';
import { InputString } from '../../../shared/directives/arguments/input-string';
import { InputVersion } from '../../../shared/directives/arguments/input-version';
import { InputLicense } from '../../../shared/directives/arguments/input-license';
import { InputLanguages } from '../../../shared/directives/arguments/input-languages';
import { InputFiles } from '../../../shared/directives/arguments/input-files';
import { DataToCMakeService } from '../../cmake-project/services/data-to-cmake-service';
import { CMakeCommandParser } from './cmake-command-parser';
import { CMakeCommandString } from '../models/cmake-command-string';
import { CMakeArgumentTyped } from '../models/cmake-argument-typed';
import { CMakeCommandMapping } from './cmake-command-mapping';
import { assertError } from '../../../shared/interfaces/errors';

@Injectable({
  providedIn: 'root',
})
export class DeserializerRegistry {
  private envInjector = inject(EnvironmentInjector);
  private dataToCMakeService = inject(DataToCMakeService);
  private cmakeCommandParser = inject(CMakeCommandParser);
  private cmakeCommandMapping = inject(CMakeCommandMapping);

  private setArgument(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    component: any,
    args: Map<string, CMakeArgumentTyped>,
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

    throw assertError(`Failed to set field ${field} with setArgument ${value}`);
  }

  private cmakeCommandToComponent(
    command: CMakeCommandString,
    parentContextInjector: Injector
  ):
    | ComponentRef<CMakeComponentInterface<CMakeFeatureInterface<unknown>>>
    | undefined {
    const commandParser = this.cmakeCommandMapping.getCMakeCommand(
      command.name,
      command.args[0]
    );
    if (commandParser === undefined) {
      console.warn(`Unknown command ${command.name}`);
      return undefined;
    }

    const commandComponent = createComponent(commandParser.component, {
      environmentInjector: this.envInjector,
      elementInjector: parentContextInjector,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const anyComponent: any = commandComponent.instance;

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
