import { Injectable } from '@angular/core';

import { CMakeCommandInterface } from '../../commands/services/cmake-command-interface';
import { FullProjectView } from '../components/full-project-view';

@Injectable({
  providedIn: 'root',
})
export abstract class FullProjectService extends CMakeCommandInterface<FullProjectView> {
  readonly validateArgs = [];
}
