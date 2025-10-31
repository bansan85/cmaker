import { InjectionToken } from '@angular/core';
import { Version } from './shared/models/version';

export const DEFAULT_MAX_VERSION = new InjectionToken<Version>('DEFAULT_MAX_VERSION');