import { Injectable } from '@angular/core';
import { FullProjectView } from '../components/full-project-view';
import { CMakeFeatureInterface } from '../../commands/services/cmake-feature-interface';
import { Version } from '../../../shared/models/version';
import { CMakeAvailableData } from '../../cmake-project/interfaces/cmake-available-data';

@Injectable({
  providedIn: 'root',
})
export class FullProjectService extends CMakeFeatureInterface<FullProjectView> {
  override cmakeMinVersion: Version | null = null;
  override isEnabled(action: FullProjectView): boolean {
    throw new Error('Method not implemented.');
  }
  override isValid(action: FullProjectView): boolean {
    throw new Error('Method not implemented.');
  }
  protected override cmakeRequiredVersionImpl(
    action: FullProjectView
  ): Version | null {
    throw new Error('Method not implemented.');
  }
  protected override cmakeObjectsImpl(
    action: FullProjectView
  ): CMakeAvailableData {
    throw new Error('Method not implemented.');
  }
  protected override toCMakeListTxtImpl(action: FullProjectView): string {
    throw new Error('Method not implemented.');
  }
}
