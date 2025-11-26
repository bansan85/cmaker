import { CMakeFeatureInterface } from '../../features/commands/services/cmake-feature-interface';
import { Version } from '../models/version';

export interface CheckboxesItemInterface {
  enabled: boolean;

  readonly name: string;

  // Only one.
  // If service is set, get version from service.cmakeMinVersion.
  service?: CMakeFeatureInterface<unknown>;
  version?: Version;
}
