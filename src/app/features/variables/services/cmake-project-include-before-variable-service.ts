import { Injectable } from '@angular/core';
import { CMakeFeatureInterface } from '../../commands/services/cmake-feature-interface';
import { CMakeProjectIncludeBeforeVariableModel } from '../models/cmake-project-include-before-variable.model';
import { Version } from '../../../shared/models/version';
import { CMakeAvailableData } from '../../cmake-project/interfaces/cmake-available-data';

@Injectable({
  providedIn: null,
})
export class CMakeProjectIncludeBeforeVariableService extends CMakeFeatureInterface<CMakeProjectIncludeBeforeVariableModel> {
  override cmakeMinVersion: Version | null;
  override isEnabled(action: CMakeProjectIncludeBeforeVariableModel): boolean {
    throw new Error('Method not implemented.');
  }
  override isValid(action: CMakeProjectIncludeBeforeVariableModel): boolean {
    throw new Error('Method not implemented.');
  }
  protected override cmakeRequiredVersionImpl(
    action: CMakeProjectIncludeBeforeVariableModel
  ): Version | null {
    throw new Error('Method not implemented.');
  }
  protected override cmakeObjectsImpl(
    action: CMakeProjectIncludeBeforeVariableModel
  ): CMakeAvailableData {
    throw new Error('Method not implemented.');
  }
  protected override toCMakeListTxtImpl(
    action: CMakeProjectIncludeBeforeVariableModel
  ): string {
    throw new Error('Method not implemented.');
  }
}
