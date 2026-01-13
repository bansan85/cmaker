import { CMakeFeatureInterfaceCMakeMinVersion } from '../../features/commands/services/cmake-feature-interface';

export interface CheckboxesItemInterface {
  enabled: boolean;

  readonly itemName: string;

  readonly service: CMakeFeatureInterfaceCMakeMinVersion;
}
