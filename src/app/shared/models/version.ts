export class Version {
  major: number;
  minor: number;

  constructor(version: string) {
    const parts = version.split(".");
    this.major = parseInt(parts[0], 10);
    this.minor = parseInt(parts[1], 10);
  }

  public static isValid(version: string): boolean {
    return /^\d+\.\d+$/.test(version);
  }

  isGreater(other: Version): boolean {
    if (this.major > other.major) return true;
    if (this.major < other.major) return false;
    return this.minor > other.minor;
  }

  isGreaterOrEqual(other: Version): boolean {
    if (this.major > other.major) return true;
    if (this.major < other.major) return false;
    return this.minor >= other.minor;
  }

  isLess(other: Version): boolean {
    if (this.major < other.major) return true;
    if (this.major > other.major) return false;
    return this.minor < other.minor;
  }

  isLessOrEqual(other: Version): boolean {
    if (this.major < other.major) return true;
    if (this.major > other.major) return false;
    return this.minor <= other.minor;
  }

  equals(other: Version): boolean {
    return this.major === other.major && this.minor === other.minor;
  }

  compareTo(other: Version): number {
    if (this.major !== other.major) {
      return this.major - other.major;
    }
    return this.minor - other.minor;
  }

  toString(): string {
    return `${this.major}.${this.minor}`;
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
