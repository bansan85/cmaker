import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { DEFAULT_MAX_VERSION } from './app.tokens';
import { Version } from './shared/models/version';
import { LucideAngularModule, Menu, ChevronDown } from 'lucide-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    { provide: DEFAULT_MAX_VERSION, useValue: new Version(4, 3) },
    importProvidersFrom(LucideAngularModule.pick({ Menu, ChevronDown })),
  ],
};
