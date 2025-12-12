import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import {
  assertError,
  unknownAssertError,
} from './app/shared/interfaces/errors';

bootstrapApplication(AppComponent, appConfig).catch((err: unknown) => {
  throw unknownAssertError(err);
});
