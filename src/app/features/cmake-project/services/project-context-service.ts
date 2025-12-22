import { inject, Injectable, signal } from '@angular/core';
import { Version } from '../../../shared/models/version';
import { DEFAULT_MAX_VERSION } from '../../../app.tokens';

@Injectable({
  providedIn: null,
})
export class ProjectContextService {
  protected readonly versionSignal = signal(inject(DEFAULT_MAX_VERSION));
  get version(): Version {
    return this.versionSignal();
  }
  set version(val: Version) {
    this.versionSignal.set(val);
  }

  protected readonly rootPathSignal = signal('');
  get rootPath(): string {
    return this.rootPathSignal();
  }
  set rootPath(val: string) {
    this.rootPathSignal.set(val);
  }
}
