import { inject, Injectable, signal, WritableSignal } from '@angular/core';

import { DEFAULT_MAX_VERSION } from '../../../app.tokens';
import { InputDirectoryModel } from '../../../shared/models/arguments/input-directory-model';
import { InputVersionModel } from '../../../shared/models/arguments/input-version-model';
import { Version } from '../../../shared/models/version';
import { OptionsModel } from '../models/options.model';

@Injectable({
  providedIn: null,
})
export class ProjectContextService implements OptionsModel {
  private readonly maxCMakeVersionSignal: WritableSignal<Version | undefined> =
    signal(inject(DEFAULT_MAX_VERSION));
  private readonly rootPathSignal = signal('');

  // eslint-disable-next-line @typescript-eslint/related-getter-setter-pairs
  get maxCMakeVersion(): InputVersionModel {
    return { enabled: true, version: this.maxCMakeVersionSignal() };
  }
  set maxCMakeVersion(value: Version | undefined) {
    this.maxCMakeVersionSignal.set(value);
  }

  // eslint-disable-next-line @typescript-eslint/related-getter-setter-pairs
  get rootPath(): InputDirectoryModel {
    return { enabled: true, directory: this.rootPathSignal() };
  }
  set rootPath(value: string) {
    this.rootPathSignal.set(value);
  }
}
