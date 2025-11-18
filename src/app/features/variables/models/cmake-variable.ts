import { Version } from '../../../shared/models/version';

export interface CMakeVariable {
  name: string;
  version: Version | null;
}
