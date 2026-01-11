import { describe, expect, it } from 'vitest';

import { Version } from '../../../shared/models/version';
import {
  CMakeAvailableData,
  mergeCMakeAvailableData,
} from './cmake-available-data';

describe('CMakeAvailableData', () => {
  it('should merge data with mergeCMakeAvailableData', () => {
    const emptyData1: CMakeAvailableData = {};
    const data2: CMakeAvailableData = {
      options: [{ helpText: 'Hello', value: '123.5', variable: 'myName' }],
      policies: [
        {
          name: 'policyName',
          startVersion: new Version(1, 3, 4),
          warnIfUnset: false,
          endVersion: new Version(4, 3, 8),
        },
      ],
      variables: [{ name: 'variableName', version: new Version(2, 3, 0) }],
    };
    const mergeData1 = mergeCMakeAvailableData(emptyData1, data2);
    const mergeData2 = mergeCMakeAvailableData(data2, emptyData1);
    expect(mergeData1).toStrictEqual(data2);
    expect(mergeData2).toStrictEqual(data2);
    const data3: CMakeAvailableData = {
      options: [{ helpText: 'Hello2', value: '123.52', variable: 'myName2' }],
      policies: [
        {
          name: 'policyName2',
          startVersion: new Version(1, 3, 4, 2),
          warnIfUnset: true,
          endVersion: new Version(4, 3, 8, 2),
        },
      ],
      variables: [{ name: 'variableName2', version: new Version(2, 3, 0, 2) }],
    };
    const mergeData3: CMakeAvailableData = {
      options: [
        { helpText: 'Hello', value: '123.5', variable: 'myName' },
        { helpText: 'Hello2', value: '123.52', variable: 'myName2' },
      ],
      policies: [
        {
          name: 'policyName',
          startVersion: new Version(1, 3, 4),
          warnIfUnset: false,
          endVersion: new Version(4, 3, 8),
        },
        {
          name: 'policyName2',
          startVersion: new Version(1, 3, 4, 2),
          warnIfUnset: true,
          endVersion: new Version(4, 3, 8, 2),
        },
      ],
      variables: [
        { name: 'variableName', version: new Version(2, 3, 0) },
        { name: 'variableName2', version: new Version(2, 3, 0, 2) },
      ],
    };
    expect(mergeCMakeAvailableData(data2, data3)).toStrictEqual(mergeData3);
  });
});
