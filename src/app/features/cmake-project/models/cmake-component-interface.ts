import { CMakeFeatureInterface } from '../../commands/services/cmake-feature-interface';

export interface CMakeComponentInterface<T, U = CMakeFeatureInterface<T>> {
  service: U;
}
