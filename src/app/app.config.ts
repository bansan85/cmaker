import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { ChevronDown,LucideAngularModule, Menu } from 'lucide-angular';

import { routes } from './app.routes';
import { DEFAULT_MAX_VERSION } from './app.tokens';
import { Version } from './shared/models/version';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    { provide: DEFAULT_MAX_VERSION, useValue: new Version(4, 3) },
    importProvidersFrom(LucideAngularModule.pick({ Menu, ChevronDown })),
  ],
};
