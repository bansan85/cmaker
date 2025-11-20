import { ProjectCompatVersionModel } from '../../arguments/models/project-compat-version.model';
import { ProjectDescriptionModel } from '../../arguments/models/project-description.model';
import { ProjectHomepageUrlModel } from '../../arguments/models/project-homepage-url.model';
import { ProjectLanguagesModel } from '../../arguments/models/project-languages.model';
import { ProjectNameModel } from '../../arguments/models/project-name.model';
import { ProjectSpdxLicenseModel } from '../../arguments/models/project-spdx-license.model';
import { ProjectVersionModel } from '../../arguments/models/project-version.model';

export interface ProjectModel {
  name: ProjectNameModel;
  version?: ProjectVersionModel;
  compatVersion?: ProjectCompatVersionModel;
  spdxLicense?: ProjectSpdxLicenseModel;
  description?: ProjectDescriptionModel;
  homepageUrl?: ProjectHomepageUrlModel;
  languages?: ProjectLanguagesModel;
}
