import { Version } from "../../../shared/models/version";
import { CMakeAvailableData } from "../../cmake-project/interfaces/cmake-available-data";

export interface CMakeFeatureInterface<Feature> {
  cmakeMinVersion: Version | null;
  isValid(action: Feature): boolean;
  cmakeRequiredVersion(action: Feature): Version | null;
  cmakeObjects(action: Feature): CMakeAvailableData;
  toCMakeListTxt(action: Feature): string;
}
