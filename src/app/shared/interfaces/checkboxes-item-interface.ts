import { CMakeFeatureInterface } from '../../features/commands/services/cmake-feature-interface';
import { Version } from '../models/version';

export interface CheckboxesItemInterface {
  enabled: boolean;

  readonly itemName: string;

  // Only one.
  // If service is set, get version from service.cmakeMinVersion.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  service?: CMakeFeatureInterface<any>;
  version?: Version;
}
