import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StringService {
  upperToCamelCase(str: string): string {
    return str
      .toLowerCase()
      .split('-')
      .map((word, index) =>
        index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join('');
  }

  private censor(censor: unknown) {
    let i = 0;

    return function (_key: string, value: unknown): unknown {
      if (
        i !== 0 &&
        typeof censor === 'object' &&
        typeof value === 'object' &&
        censor === value
      ) {
        return '[Circular]';
      }

      if (i >= 35) {
        return `[Unknown:${typeof value}]`;
      }

      i += 1;

      return value;
    };
  }

  secureJsonStringify(object: unknown): string {
    return JSON.stringify(object, this.censor(object));
  }
}
