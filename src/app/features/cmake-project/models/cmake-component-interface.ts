import { CMakeFeatureInterface } from '../../commands/services/cmake-feature-interface';

export interface CMakeComponentInterface<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Service extends CMakeFeatureInterface<any>
> {
  service: Service;
}
