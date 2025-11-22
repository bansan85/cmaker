export class Version {
  major: number;
  minor?: number;
  patch?: number;
  tweak?: number;

  constructor(version: string);
  constructor(major: number, minor?: number, patch?: number, tweak?: number);
  constructor(
    arg1: string | number,
    arg2?: number,
    arg3?: number,
    arg4?: number
  ) {
    if (typeof arg1 === 'string') {
      const parts = arg1.split('.');
      this.major = parseInt(parts[0], 10);
      if (parts.length > 1) {
        this.minor = parseInt(parts[1], 10);
      }
      if (parts.length > 2) {
        this.patch = parseInt(parts[2], 10);
      }
      if (parts.length > 3) {
        this.tweak = parseInt(parts[3], 10);
      }
    } else {
      this.major = arg1;
      this.minor = arg2;
      this.patch = arg3;
      this.tweak = arg4;
    }
  }

  public static isValid(version: string): boolean {
    return /^\d+(?:\.\d+){0,3}$/u.test(version);
  }

  toString(): string {
    if (this.minor === undefined) {
      return `${this.major}`;
    }
    if (this.patch === undefined) {
      return `${this.major}.${this.minor}`;
    }
    if (this.tweak === undefined) {
      return `${this.major}.${this.minor}.${this.patch}`;
    }
    return `${this.major}.${this.minor}.${this.patch}.${this.tweak}`;
  }
}
