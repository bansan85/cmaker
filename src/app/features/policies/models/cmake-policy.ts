import { Version } from '../../../shared/models/version';

export interface CMakePolicy {
  name: string;
  warnIfUnset: boolean;
  startVersion: Version;
  endVersion?: Version;
}
