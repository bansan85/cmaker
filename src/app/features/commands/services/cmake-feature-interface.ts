import { Version } from '../../../shared/models/version';
import { CMakeAvailableData } from '../../cmake-project/interfaces/cmake-available-data';

export abstract class CMakeFeatureInterface<Feature> {
  abstract cmakeMinVersion: Version | null;
  abstract isEnabled(action: Feature): boolean;
  abstract isValid(action: Feature): Promise<boolean>;

  cmakeRequiredVersion(action: Feature): Version | null {
    if (this.isEnabled(action)) {
      return this.cmakeRequiredVersionImpl(action);
    } else {
      return null;
    }
  }

  protected abstract cmakeRequiredVersionImpl(action: Feature): Version | null;

  cmakeObjects(action: Feature): CMakeAvailableData {
    if (this.isEnabled(action)) {
      return this.cmakeObjectsImpl(action);
    } else {
      return {};
    }
  }

  protected abstract cmakeObjectsImpl(action: Feature): CMakeAvailableData;

  toCMakeListTxt(action: Feature): string {
    if (this.isEnabled(action)) {
      let retval = '';
      if (!this.isValid(action)) {
        retval += '# Invalid\n';
      }
      return retval + this.toCMakeListTxtImpl(action);
    } else {
      return '';
    }
  }

  protected abstract toCMakeListTxtImpl(action: Feature): string;
}
