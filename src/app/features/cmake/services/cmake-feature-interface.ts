import { Version } from "../../../shared/models/version";
import { CMakeObjects } from "../models/cmake-objects";

export interface CMakeFeatureInterface<Feature> {
  cmakeMinVersion(action: Feature): Version | null;
  cmakeObjects(action: Feature): CMakeObjects;
  toCMakeListTxt(action: Feature): string;
}
