import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { Version } from '../../../shared/models/version';
import { DataToCMakeService } from './data-to-cmake-service';

describe('DataToCMakeService', () => {
  let service: DataToCMakeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataToCMakeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();

    expect(service.booleanToString(true)).toEqual('ON');
    expect(service.booleanToString(false)).toEqual('OFF');

    expect(service.stringToBoolean('ON')).toEqual(true);
    expect(service.stringToBoolean('OFF')).toEqual(false);

    expect(service.stringToVersion('trez')).toBeUndefined();
    expect(service.stringToVersion('1.2.4')).toStrictEqual(
      new Version(1, 2, 4)
    );

    expect(service.isValidTargetName('ON')).toEqual(true);
    expect(service.isValidTargetName('"\'(-è_iokjn)\'"')).toEqual(false);

    expect(
      service.stringToCMakeName('A<PROJECT-NAME>B', { project: 'TOTO' })
    ).toEqual('ATOTOB');
  });
});
