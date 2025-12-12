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
  isEnabled(_action: FullProjectView): boolean {
    throw new Error('Method not implemented.');
  }
  isValid(_action: FullProjectView): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  protected cmakeRequiredVersionImpl(_action: FullProjectView): Version | null {
    throw new Error('Method not implemented.');
  }
  protected cmakeObjectsImpl(_action: FullProjectView): CMakeAvailableData {
    throw new Error('Method not implemented.');
  }
  protected toCMakeListTxtImpl(_action: FullProjectView): Promise<string> {
    throw new Error('Method not implemented.');
  }
  toCMakerTxt(_action: FullProjectView): string {
    throw new Error('Method not implemented.');
  }
}
