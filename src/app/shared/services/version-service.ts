import { Injectable } from '@angular/core';

import { Version } from '../models/version';

@Injectable({
  providedIn: 'root',
})
export class VersionService {
  isGreater(a: Version | null, b: Version | null): boolean {
    if (a === null || b === null) {
      return a !== null && b === null;
    }

    if (a.major !== b.major) {
      return a.major > b.major;
    }

    const aMinor = a.minor ?? -1;
    const bMinor = b.minor ?? -1;
    if (aMinor !== bMinor) {
      return aMinor > bMinor;
    }

    const aPatch = a.patch ?? -1;
    const bPatch = b.patch ?? -1;
    if (aPatch !== bPatch) {
      return aPatch > bPatch;
    }

    const aTweak = a.tweak ?? -1;
    const bTweak = b.tweak ?? -1;
    return aTweak > bTweak;
  }

  isGreaterOrEqual(a: Version | null, b: Version | null): boolean {
    if (a === null || b === null) {
      return b === null;
    }

    if (a.major !== b.major) {
      return a.major >= b.major;
    }

    const aMinor = a.minor ?? -1;
    const bMinor = b.minor ?? -1;
    if (aMinor !== bMinor) {
      return aMinor >= bMinor;
    }

    const aPatch = a.patch ?? -1;
    const bPatch = b.patch ?? -1;
    if (aPatch !== bPatch) {
      return aPatch >= bPatch;
    }

    const aTweak = a.tweak ?? -1;
    const bTweak = b.tweak ?? -1;
    return aTweak >= bTweak;
  }

  isLess(a: Version | null, b: Version | null): boolean {
    if (a === null || b === null) {
      return b !== null;
    }

    if (a.major !== b.major) {
      return a.major < b.major;
    }

    const aMinor = a.minor ?? -1;
    const bMinor = b.minor ?? -1;
    if (aMinor !== bMinor) {
      return aMinor < bMinor;
    }

    const aPatch = a.patch ?? -1;
    const bPatch = b.patch ?? -1;
    if (aPatch !== bPatch) {
      return aPatch < bPatch;
    }

    const aTweak = a.tweak ?? -1;
    const bTweak = b.tweak ?? -1;
    return aTweak < bTweak;
  }

  isLessOrEqual(a: Version | null, b: Version | null): boolean {
    if (a === null || b === null) {
      return a === null;
    }

    if (a.major !== b.major) {
      return a.major <= b.major;
    }

    const aMinor = a.minor ?? -1;
    const bMinor = b.minor ?? -1;
    if (aMinor !== bMinor) {
      return aMinor <= bMinor;
    }

    const aPatch = a.patch ?? -1;
    const bPatch = b.patch ?? -1;
    if (aPatch !== bPatch) {
      return aPatch <= bPatch;
    }

    const aTweak = a.tweak ?? -1;
    const bTweak = b.tweak ?? -1;
    return aTweak <= bTweak;
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
