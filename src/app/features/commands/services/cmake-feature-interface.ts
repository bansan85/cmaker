import { Version } from "../../../shared/models/version";
import { CMakeAvailableData } from "../models/cmake-available-data";

export interface CMakeFeatureInterface<Feature> {
  cmakeMinVersion(action: Feature): Version | null;
  cmakeObjects(action: Feature): CMakeAvailableData;
  toCMakeListTxt(action: Feature): string;
}
