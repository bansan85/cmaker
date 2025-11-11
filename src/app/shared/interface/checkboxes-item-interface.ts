import { CMakeFeatureInterface } from "../../features/commands/services/cmake-feature-interface";
import { Version } from "../models/version";

export interface CheckboxesItemInterface {
  enabled: boolean;

  readonly name: string;

  service?: CMakeFeatureInterface<any>;
  version?: Version;
}
