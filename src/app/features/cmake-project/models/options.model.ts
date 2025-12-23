import { InputDirectoryModel } from '../../../shared/models/arguments/input-directory-model';
import { InputVersionModel } from '../../../shared/models/arguments/input-version-model';

export interface OptionsModel {
  maxCMakeVersion: InputVersionModel;
  rootPath: InputDirectoryModel;
}
