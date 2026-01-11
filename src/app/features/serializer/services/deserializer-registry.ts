import {
  ComponentRef,
  createComponent,
  EnvironmentInjector,
  inject,
  Injectable,
  Injector,
} from '@angular/core';

import { InputCheckbox } from '../../../shared/directives/arguments/input-checkbox';
import { InputFiles } from '../../../shared/directives/arguments/input-files';
import { InputLanguages } from '../../../shared/directives/arguments/input-languages';
import { InputLicense } from '../../../shared/directives/arguments/input-license';
import { InputProjectNameFiles } from '../../../shared/directives/arguments/input-project-name-files';
import { InputString } from '../../../shared/directives/arguments/input-string';
import { InputVersion } from '../../../shared/directives/arguments/input-version';
import { assertError } from '../../../shared/interfaces/errors';
import { Version } from '../../../shared/models/version';
import { StringService } from '../../../shared/services/string-service';
import { CMakeComponentInterface } from '../../cmake-project/models/cmake-component-interface';
import { DataToCMakeService } from '../../cmake-project/services/data-to-cmake-service';
import { CMakeFeatureInterface } from '../../commands/services/cmake-feature-interface';
import { CMakeArgumentTyped } from '../models/cmake-argument-typed';
import { CMakeCommandString } from '../models/cmake-command-string';
import { CMakeCommandMapping } from './cmake-command-mapping';
import { CMakeCommandParser } from './cmake-command-parser';

@Injectable({
  providedIn: 'root',
})
export class DeserializerRegistry {
  private readonly envInjector = inject(EnvironmentInjector);
  private readonly dataToCMakeService = inject(DataToCMakeService);
  private readonly cmakeCommandParser = inject(CMakeCommandParser);
  private readonly cmakeCommandMapping = inject(CMakeCommandMapping);
  private readonly stringService = inject(StringService);

  private setArgument(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    component: any,
    args: Map<string, CMakeArgumentTyped> | undefined,
    field: string,
    value: string
  ) {
    const argumentField = args?.get(field);
    const argumentFieldName =
      argumentField === undefined ? '' : argumentField.name;
    for (const comp of [component, component[argumentFieldName]].filter(
      (x) => x !== undefined
    )) {
      if ('enabled' in comp) {
        comp.enabled = true;
      }
      if (comp instanceof InputString) {
        comp.text = value;
        return;
      } else if (comp instanceof InputVersion) {
        comp.version = new Version(value);
        return;
      } else if (comp instanceof InputLicense) {
        comp.license = value;
        return;
      } else if (comp instanceof InputLanguages) {
        comp.languages = value;
        return;
      } else if (comp instanceof InputFiles) {
        comp.files = this.dataToCMakeService.filesToArrayString(value);
        return;
      } else if (comp instanceof InputCheckbox) {
        comp.checked = this.dataToCMakeService.stringToBoolean(value);
        return;
      } else if (comp instanceof InputProjectNameFiles) {
        comp.files = this.dataToCMakeService.filesToArrayString(value);
        return;
      }
    }

    throw assertError(
      `Failed to set field "${field}" with setArgument ${value}.\nComponent: ${JSON.stringify(
        component
      )}`
    );
  }

  private setArgumentFromFirstArgumentName(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    anyComponent: any,
    firstArgumentField: string | undefined,
    firstArgumentValue: string | undefined
  ) {
    if (
      firstArgumentField === undefined ||
      firstArgumentValue === undefined ||
      !firstArgumentField.includes('<')
    ) {
      return;
    }

    const pattern = firstArgumentField.replace(/<.*>/u, '(.*)');
    const regex = new RegExp(`^${pattern}$`, 'u');
    const matchField = firstArgumentField.match(regex)?.at(1);
    const matchValue = firstArgumentValue.match(regex)?.at(1);
    if (matchField === undefined || matchValue === undefined) {
      return;
    }

    const camelCaseField = this.stringService
      .upperToCamelCase(matchField)
      .substring(1, matchField.length - 2);

    if (camelCaseField in anyComponent) {
      anyComponent[camelCaseField] = matchValue;
    } else {
      console.warn(
        `Failed to set ${matchValue} in ${camelCaseField} in component ${JSON.stringify(
          anyComponent
        )}.`
      );
    }
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

    this.setArgumentFromFirstArgumentName(
      anyComponent,
      commandParser.firstArgument,
      command.args[0]
    );

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

    if (currentArgumentValue !== '') {
      // Argument value
      this.setArgument(
        anyComponent,
        commandParser.arguments,
        currentArgumentName,
        currentArgumentValue
      );
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
