import { Injectable } from '@angular/core';
import { FullProjectView } from '../components/full-project-view';
import { CMakeCommandInterface } from '../../commands/services/cmake-command-interface';

@Injectable({
  providedIn: 'root',
})
export abstract class FullProjectService extends CMakeCommandInterface<FullProjectView> {
  // todo
}
