export class Version {
  major: number;
  minor?: number;
  patch?: number;
  tweak?: number;

  constructor(version: string) {
    const parts = version.split(".");
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
  }

  public static isValid(version: string): boolean {
    return /^\d+(\.\d+){0,3}$/.test(version);
  }

  isGreater(other: Version): boolean {
    if (this.major !== other.major) {
      return this.major > other.major;
    }

    const this_minor = this.minor ?? -1;
    const other_minor = other.minor ?? -1;
    if (this_minor !== other_minor) {
      return this_minor > other_minor;
    }

    const this_patch = this.patch ?? -1;
    const other_patch = other.patch ?? -1;
    if (this_patch !== other_patch) {
      return this_patch > other_patch;
    }

    const this_tweak = this.tweak ?? -1;
    const other_tweak = other.tweak ?? -1;
    return this_tweak > other_tweak;
  }

  isGreaterOrEqual(other: Version): boolean {
    if (this.major !== other.major) {
      return this.major >= other.major;
    }

    const this_minor = this.minor ?? -1;
    const other_minor = other.minor ?? -1;
    if (this_minor !== other_minor) {
      return this_minor >= other_minor;
    }

    const this_patch = this.patch ?? -1;
    const other_patch = other.patch ?? -1;
    if (this_patch !== other_patch) {
      return this_patch >= other_patch;
    }

    const this_tweak = this.tweak ?? -1;
    const other_tweak = other.tweak ?? -1;
    return this_tweak >= other_tweak;
  }

  isLess(other: Version): boolean {
    if (this.major !== other.major) {
      return this.major < other.major;
    }

    const this_minor = this.minor ?? -1;
    const other_minor = other.minor ?? -1;
    if (this_minor !== other_minor) {
      return this_minor < other_minor;
    }

    const this_patch = this.patch ?? -1;
    const other_patch = other.patch ?? -1;
    if (this_patch !== other_patch) {
      return this_patch < other_patch;
    }

    const this_tweak = this.tweak ?? -1;
    const other_tweak = other.tweak ?? -1;
    return this_tweak < other_tweak;
  }

  isLessOrEqual(other: Version): boolean {
    if (this.major !== other.major) {
      return this.major <= other.major;
    }

    const this_minor = this.minor ?? -1;
    const other_minor = other.minor ?? -1;
    if (this_minor !== other_minor) {
      return this_minor <= other_minor;
    }

    const this_patch = this.patch ?? -1;
    const other_patch = other.patch ?? -1;
    if (this_patch !== other_patch) {
      return this_patch <= other_patch;
    }

    const this_tweak = this.tweak ?? -1;
    const other_tweak = other.tweak ?? -1;
    return this_tweak <= other_tweak;
  }

  equals(other: Version): boolean {
    return (
      this.major === other.major &&
      this.minor === other.minor &&
      this.patch === other.patch &&
      this.tweak === other.tweak
    );
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

  max(other: Version): Version {
    if (this.isGreater(other)) {
      return this;
    } else {
      return other;
    }
  }

  min(other: Version): Version {
    if (this.isGreater(other)) {
      return other;
    } else {
      return this;
    }
  }
}
