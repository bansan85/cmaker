import { CMakeFeatureInterface } from "../../commands/services/cmake-feature-interface";

export interface CMakeProvider<Service extends CMakeFeatureInterface<any>> {
  service: Service;
}
