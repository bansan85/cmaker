import { TestBed } from '@angular/core/testing';

import { ProjectSpdxLicenseParserService } from './project-spdx-license-parser-service';

describe('ProjectSpdxLicenseParserService', () => {
  let service: ProjectSpdxLicenseParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectSpdxLicenseParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should validate licenses', () => {
    expect(service.parse('MIT')).toBeTrue();
    expect(service.parse('MIT+')).toBeTrue();
    expect(service.parse('LGPL-2.1-only OR MIT')).toBeTrue();
    expect(service.parse('MIT AND LGPL-2.1-only')).toBeTrue();
    expect(service.parse('LGPL-2.1-only AND MIT AND BSD-2-Clause')).toBeTrue();
    expect(service.parse('LGPL-2.1-only OR BSD-3-Clause AND MIT')).toBeTrue();
    expect(
      service.parse('MIT+ AND (LGPL-2.1-or-later OR BSD-3-Clause)')
    ).toBeTrue();
    expect(service.parse('LGPL-2.1-only OR MIT OR BSD-3-Clause')).toBeTrue();
    expect(
      service.parse('GPL-2.0-or-later WITH Bison-exception-2.2')
    ).toBeTrue();
    expect(service.parse('LicenseRef-23')).toBeTrue();
    expect(service.parse('LicenseRef-MIT-Style-1')).toBeTrue();
    expect(
      service.parse(
        'DocumentRef-spdx-tool-1.2:LicenseRef-MIT-Style-2 WITH DocumentRef-spdx-tool-1.2:AdditionRef-MIT-Style-2'
      )
    ).toBeTrue();
  });

  it('should invalidate wrong licenses', () => {
    // Invalid license
    expect(
      service.parse('DocumentRef-spdx-tool-1.2:AdditionRef-MIT-Style-2')
    ).toBeFalse();
    expect(
      service.parse('DocumentRef-spdx-tool-1.2:AdditionRef-MIT-Style-2')
    ).toBeFalse();
    // Missing operators
    expect(service.parse('MIT Apache-2.0')).toBeFalse();
    expect(service.parse('MIT BSD-3-Clause GPL-3.0')).toBeFalse();
    // Invalid operators
    expect(service.parse('MIT & Apache-2.0')).toBeFalse();
    expect(service.parse('MIT | GPL-3.0')).toBeFalse();
    expect(service.parse('MIT && Apache-2.0')).toBeFalse();
    expect(service.parse('MIT || GPL-3.0')).toBeFalse();
    // Misplaced operators
    expect(service.parse('AND MIT')).toBeFalse();
    expect(service.parse('MIT AND')).toBeFalse();
    expect(service.parse('OR Apache-2.0')).toBeFalse();
    expect(service.parse('MIT OR')).toBeFalse();
    expect(service.parse('MIT AND AND Apache-2.0')).toBeFalse();
    expect(service.parse('MIT OR OR GPL-3.0')).toBeFalse();
    // Parentheses issues
    expect(service.parse('(MIT')).toBeFalse();
    expect(service.parse('MIT)')).toBeFalse();
    expect(service.parse('((MIT)')).toBeFalse();
    expect(service.parse('(MIT))')).toBeFalse();
    expect(service.parse('())')).toBeFalse();
    expect(service.parse('(()')).toBeFalse();
    expect(service.parse('MIT AND ()')).toBeFalse();
    expect(service.parse('(AND MIT)')).toBeFalse();
    // WITH issues
    expect(service.parse('MIT WITH')).toBeFalse();
    expect(service.parse('WITH exception')).toBeFalse();
    expect(service.parse('MIT WITH WITH exception')).toBeFalse();
    expect(service.parse('MIT AND WITH exception')).toBeFalse();
    // Plus issues
    expect(service.parse('+')).toBeFalse();
    expect(service.parse('MIT ++')).toBeFalse();
    expect(service.parse('+ MIT')).toBeFalse();
    expect(service.parse('MIT + Apache-2.0')).toBeFalse();
    // Empty/whitespace
    expect(service.parse('')).toBeFalse();
    expect(service.parse('   ')).toBeFalse();
    expect(service.parse('\n')).toBeFalse();
    // Invalid characters
    expect(service.parse('MIT@2.0')).toBeFalse();
    expect(service.parse('MIT#Apache')).toBeFalse();
    expect(service.parse('MIT & GPL')).toBeFalse();
    expect(service.parse('MIT; Apache-2.0')).toBeFalse();
    expect(service.parse('MIT, Apache-2.0')).toBeFalse();
    // Complex invalid combinations
    expect(service.parse('(MIT OR)')).toBeFalse();
    expect(service.parse('(AND Apache-2.0)')).toBeFalse();
    expect(service.parse('MIT (OR Apache-2.0)')).toBeFalse();
    expect(service.parse('MIT AND (OR GPL-3.0)')).toBeFalse();
    expect(service.parse('((MIT AND Apache-2.0)')).toBeFalse();
    expect(service.parse('MIT OR (Apache-2.0 AND)')).toBeFalse();
    // Multiple WITH
    expect(service.parse('MIT WITH exception WITH another')).toBeFalse();
    // Mixed errors
    expect(service.parse('MIT AND OR Apache-2.0')).toBeFalse();
    expect(service.parse('(MIT AND (Apache-2.0 OR)')).toBeFalse();
    expect(service.parse('MIT +AND Apache-2.0')).toBeFalse();
  });
});
