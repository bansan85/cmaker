import { CMakeFeatureInterface } from './cmake-feature-interface';

export abstract class CMakeArgumentInterface<
  Feature
> extends CMakeFeatureInterface<Feature> {}
