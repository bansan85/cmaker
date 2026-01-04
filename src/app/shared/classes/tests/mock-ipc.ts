import { InvokeArgs } from '@tauri-apps/api/core';
import { clearMocks, mockIPC } from '@tauri-apps/api/mocks';

/* eslint-disable @typescript-eslint/no-explicit-any */
export class MockIpc {
  private actions = new Map<string, (payload?: InvokeArgs) => any>();
  private used: string[] = [];
  mockCommand(commandName: string, action: (payload?: InvokeArgs) => any) {
    this.actions.set(commandName, action);
  }
  start() {
    mockIPC((cmd: string, args) => {
      const action = this.actions.get(cmd);
      if (!action) {
        throw Error(`Mock me ${cmd} / ${JSON.stringify(args)}`);
      }
      if (!this.used.includes(cmd)) {
        this.used.push(cmd);
      }
      return action(args);
    });
  }
  stop() {
    clearMocks();
    const missingKeys = Array.from(this.actions.keys()).filter(
      (key) => !this.used.includes(key)
    );
    if (missingKeys.length !== 0) {
      throw Error(`Unused mock action : ${missingKeys.join(', ')}.`);
    }
  }
}
