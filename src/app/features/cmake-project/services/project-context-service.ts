import { inject, Injectable } from '@angular/core';
import { Version } from '../../../shared/models/version';
import { DEFAULT_MAX_VERSION } from '../../../app.tokens';

@Injectable({
  providedIn: null,
})
export class ProjectContextService {
  version: Version = inject(DEFAULT_MAX_VERSION);
  rootPath = '';
}
