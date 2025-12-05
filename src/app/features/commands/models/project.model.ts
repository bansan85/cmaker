import { InputLanguagesModel } from '../../../shared/models/arguments/input-languages-model';
import { InputLicenseModel } from '../../../shared/models/arguments/input-license-model';
import { InputStringModel } from '../../../shared/models/arguments/input-string-model';
import { InputVersionModel } from '../../../shared/models/arguments/input-version-model';

export interface ProjectModel {
  name: InputStringModel;
  version?: InputVersionModel;
  compatVersion?: InputVersionModel;
  spdxLicense?: InputLicenseModel;
  description?: InputStringModel;
  homepageUrl?: InputStringModel;
  languages?: InputLanguagesModel;
}
