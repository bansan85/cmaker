/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { InvokeArgs } from '@tauri-apps/api/core';
import { clearMocks, mockIPC } from '@tauri-apps/api/mocks';

export interface IpcLoadFromFileArgs {
  path: string;
}

export interface IpcSaveToFileArgs {
  path: string;
  content: string;
}

export interface IpcRelativePathsExistsArgs {
  baseString: string;
  paths: string[];
  directory: boolean;
}

export interface IpcPathExistsArgs {
  path: string;
  directory: boolean;
}

export interface IpcPluginDialogOpen {
  options: {
    multiple: boolean;
    directory: boolean;
    filters?: { name: string; extensions: string[] }[];
  };
}

export interface IpcPluginDialogSave {
  options: {
    filters: { name: string; extensions: string[] }[];
  };
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export class MockIpc {
  private readonly debug = false;
  private readonly actions = new Map<string, (payload?: InvokeArgs) => any>();
  private readonly used: string[] = [];
  mockCommand(commandName: string, action: (payload?: InvokeArgs) => any) {
    if (this.debug) {
      console.debug(`Enable mocking ${commandName}.`);
    }
    this.actions.set(commandName, action);
  }
  start() {
    if (this.debug) {
      console.debug('Start mocking.');
    }
    mockIPC((cmd: string, args) => {
      const action = this.actions.get(cmd);
      if (!action) {
        throw Error(`Mock me ${cmd} / ${JSON.stringify(args)}.`);
      }
      if (this.debug) {
        console.debug(`Run mocking ${cmd} / ${JSON.stringify(args)}.`);
      }
      if (!this.used.includes(cmd)) {
        this.used.push(cmd);
      }
      return action(args);
    });
  }
  stop() {
    if (this.debug) {
      console.debug('Stop mocking.');
    }
    clearMocks();
    const missingKeys = Array.from(this.actions.keys()).filter(
      (key) => !this.used.includes(key)
    );
    if (missingKeys.length !== 0) {
      throw Error(`Unused mock action : ${missingKeys.join(', ')}.`);
    }
  }
}
