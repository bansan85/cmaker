import { CMakeFeatureInterface } from '../../commands/services/cmake-feature-interface';

export interface CMakeComponentInterface<
  Service extends CMakeFeatureInterface<any>,
> {
  service: Service;
}
