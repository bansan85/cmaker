import { Injectable } from '@angular/core';
import { FullProjectView } from '../components/full-project-view';
import { CMakeFeatureInterface } from '../../commands/services/cmake-feature-interface';
import { Version } from '../../../shared/models/version';
import { CMakeAvailableData } from '../../cmake-project/interfaces/cmake-available-data';

@Injectable({
  providedIn: 'root',
})
export class FullProjectService extends CMakeFeatureInterface<FullProjectView> {
  cmakeMinVersion: Version | null = null;
  isEnabled(action: FullProjectView): boolean {
    throw new Error('Method not implemented.');
  }
  isValid(action: FullProjectView): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  protected cmakeRequiredVersionImpl(action: FullProjectView): Version | null {
    throw new Error('Method not implemented.');
  }
  protected cmakeObjectsImpl(action: FullProjectView): CMakeAvailableData {
    throw new Error('Method not implemented.');
  }
  protected toCMakeListTxtImpl(action: FullProjectView): string {
    throw new Error('Method not implemented.');
  }
}
