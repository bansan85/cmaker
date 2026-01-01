import { Injectable } from '@angular/core';

import { assertError } from '../../../shared/interfaces/errors';
import {
  CMakeCommandTyped,
  cmakeCommandTypedEqual,
} from '../models/cmake-command-typed';

@Injectable({
  providedIn: 'root',
})
export class CMakeCommandMapping {
  private readonly commandMapping = new Map<string, CMakeCommandTyped[]>();

  append(
    serializeCommandName: string,
    serializeCommandParser: CMakeCommandTyped
  ) {
    const commandName = this.commandMapping.get(serializeCommandName);

    if (commandName === undefined) {
      this.commandMapping.set(serializeCommandName, [serializeCommandParser]);
      return;
    }

    const foundSameCommandNameArgs =
      commandName.findIndex(
        (x) =>
          serializeCommandParser.firstArgument === x.firstArgument &&
          serializeCommandParser.component === x.component &&
          cmakeCommandTypedEqual(serializeCommandParser.arguments, x.arguments)
      ) !== -1;
    if (foundSameCommandNameArgs) {
      return;
    }

    const foundAlmostSameCommandNameArgs = commandName.filter(
      (x) => serializeCommandParser.firstArgument === x.firstArgument
    );
    if (foundAlmostSameCommandNameArgs.length > 0) {
      throw assertError(
        `CMake Command Mapping is already done for ${serializeCommandName} / ${serializeCommandParser.firstArgument} but with differents args.`
      );
    }

    commandName.push(serializeCommandParser);
  }

  getCMakeCommand(
    name: string,
    firstArgument?: string
  ): CMakeCommandTyped | undefined {
    const commandsName = this.commandMapping.get(name);
    if (commandsName === undefined) {
      console.warn(`Unknwon command ${name}.`);
      return undefined;
    }
    if (
      commandsName.length === 1 &&
      commandsName[0].firstArgument === undefined
    ) {
      return commandsName[0];
    }
    const commandsNameArg = commandsName.filter((x) => {
      if (x.firstArgument === undefined && firstArgument === undefined) {
        return true;
      }
      if (x.firstArgument === undefined || firstArgument === undefined) {
        return false;
      }
      const pattern = x.firstArgument.replace(/<.*>/u, '(.*)');
      const regex = new RegExp(`^${pattern}$`, 'u');
      const match = firstArgument.match(regex);
      return match !== null;
    });
    if (commandsNameArg.length === 0) {
      console.warn(
        `Failed to found ${name} / ${firstArgument} in CMakeCommandMapping`
      );
      return undefined;
    }
    if (commandsNameArg.length === 1) {
      return commandsNameArg[0];
    }
    throw assertError(
      `Too many possibilities for ${name} / ${firstArgument} in CMakeCommandMapping.`
    );
  }
}
