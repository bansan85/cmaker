import { Injectable } from "@angular/core";
import { Version } from "../models/version";

@Injectable({
  providedIn: "root",
})
export class VersionService {
  isGreater(a: Version | null, b: Version | null): boolean {
    if (a === null && b === null) {
      return false;
    }
    if (a === null && b !== null) {
      return false;
    }
    if (a !== null && b === null) {
      return true;
    }
    // To make Typescript compiler happy.
    if (a === null || b === null) {
      return false;
    }

    if (a.major !== b.major) {
      return a.major > b.major;
    }

    const a_minor = a.minor ?? -1;
    const b_minor = b.minor ?? -1;
    if (a_minor !== b_minor) {
      return a_minor > b_minor;
    }

    const a_patch = a.patch ?? -1;
    const b_patch = b.patch ?? -1;
    if (a_patch !== b_patch) {
      return a_patch > b_patch;
    }

    const a_tweak = a.tweak ?? -1;
    const b_tweak = b.tweak ?? -1;
    return a_tweak > b_tweak;
  }

  isGreaterOrEqual(a: Version | null, b: Version | null): boolean {
    if (a === null && b === null) {
      return true;
    }
    if (a === null && b !== null) {
      return false;
    }
    if (a !== null && b === null) {
      return true;
    }
    // To make Typescript compiler happy.
    if (a === null || b === null) {
      return false;
    }

    if (a.major !== b.major) {
      return a.major >= b.major;
    }

    const a_minor = a.minor ?? -1;
    const b_minor = b.minor ?? -1;
    if (a_minor !== b_minor) {
      return a_minor >= b_minor;
    }

    const a_patch = a.patch ?? -1;
    const b_patch = b.patch ?? -1;
    if (a_patch !== b_patch) {
      return a_patch >= b_patch;
    }

    const a_tweak = a.tweak ?? -1;
    const b_tweak = b.tweak ?? -1;
    return a_tweak >= b_tweak;
  }

  isLess(a: Version | null, b: Version | null): boolean {
    if (a === null && b === null) {
      return false;
    }
    if (a === null && b !== null) {
      return true;
    }
    if (a !== null && b === null) {
      return false;
    }
    // To make Typescript compiler happy.
    if (a === null || b === null) {
      return false;
    }

    if (a.major !== b.major) {
      return a.major < b.major;
    }

    const a_minor = a.minor ?? -1;
    const b_minor = b.minor ?? -1;
    if (a_minor !== b_minor) {
      return a_minor < b_minor;
    }

    const a_patch = a.patch ?? -1;
    const b_patch = b.patch ?? -1;
    if (a_patch !== b_patch) {
      return a_patch < b_patch;
    }

    const a_tweak = a.tweak ?? -1;
    const b_tweak = b.tweak ?? -1;
    return a_tweak < b_tweak;
  }

  isLessOrEqual(a: Version | null, b: Version | null): boolean {
    if (a === null && b === null) {
      return true;
    }
    if (a === null && b !== null) {
      return true;
    }
    if (a !== null && b === null) {
      return false;
    }
    // To make Typescript compiler happy.
    if (a === null || b === null) {
      return false;
    }

    if (a.major !== b.major) {
      return a.major <= b.major;
    }

    const a_minor = a.minor ?? -1;
    const b_minor = b.minor ?? -1;
    if (a_minor !== b_minor) {
      return a_minor <= b_minor;
    }

    const a_patch = a.patch ?? -1;
    const b_patch = b.patch ?? -1;
    if (a_patch !== b_patch) {
      return a_patch <= b_patch;
    }

    const a_tweak = a.tweak ?? -1;
    const b_tweak = b.tweak ?? -1;
    return a_tweak <= b_tweak;
  }

  equals(a: Version | null, b: Version | null): boolean {
    return (
      (a === null && b === null) ||
      (a !== null &&
        b !== null &&
        a.major === b.major &&
        a.minor === b.minor &&
        a.patch === b.patch &&
        a.tweak === b.tweak)
    );
  }

  max(...versions: (Version | null)[]): Version | null {
    return versions.reduce(
      (max, current) => (this.isGreater(current, max) ? current : max),
      null
    );
  }

  min(...versions: (Version | null)[]): Version | null {
    return versions.reduce(
      (min, current) => (this.isGreater(current, min) ? min : current),
      null
    );
  }
}
