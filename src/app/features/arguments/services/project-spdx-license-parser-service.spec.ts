import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

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
    expect(service.parse('MIT')).toBe(true);
    expect(service.parse('MIT+')).toBe(true);
    expect(service.parse('LGPL-2.1-only OR MIT')).toBe(true);
    expect(service.parse('MIT AND LGPL-2.1-only')).toBe(true);
    expect(service.parse('LGPL-2.1-only AND MIT AND BSD-2-Clause')).toBe(true);
    expect(service.parse('LGPL-2.1-only OR BSD-3-Clause AND MIT')).toBe(true);
    expect(service.parse('MIT+ AND (LGPL-2.1-or-later OR BSD-3-Clause)')).toBe(
      true
    );
    expect(service.parse('LGPL-2.1-only OR MIT OR BSD-3-Clause')).toBe(true);
    expect(service.parse('GPL-2.0-or-later WITH Bison-exception-2.2')).toBe(
      true
    );
    expect(service.parse('LicenseRef-23')).toBe(true);
    expect(service.parse('LicenseRef-MIT-Style-1')).toBe(true);
    expect(
      service.parse(
        'DocumentRef-spdx-tool-1.2:LicenseRef-MIT-Style-2 WITH DocumentRef-spdx-tool-1.2:AdditionRef-MIT-Style-2'
      )
    ).toBe(true);
  });

  it('should invalidate wrong licenses', () => {
    // Invalid license
    expect(
      service.parse('DocumentRef-spdx-tool-1.2:AdditionRef-MIT-Style-2')
    ).toBe(false);
    expect(
      service.parse('DocumentRef-spdx-tool-1.2:AdditionRef-MIT-Style-2')
    ).toBe(false);
    // Missing operators
    expect(service.parse('MIT Apache-2.0')).toBe(false);
    expect(service.parse('MIT BSD-3-Clause GPL-3.0')).toBe(false);
    // Invalid operators
    expect(service.parse('MIT & Apache-2.0')).toBe(false);
    expect(service.parse('MIT | GPL-3.0')).toBe(false);
    expect(service.parse('MIT && Apache-2.0')).toBe(false);
    expect(service.parse('MIT || GPL-3.0')).toBe(false);
    // Misplaced operators
    expect(service.parse('AND MIT')).toBe(false);
    expect(service.parse('MIT AND')).toBe(false);
    expect(service.parse('OR Apache-2.0')).toBe(false);
    expect(service.parse('MIT OR')).toBe(false);
    expect(service.parse('MIT AND AND Apache-2.0')).toBe(false);
    expect(service.parse('MIT OR OR GPL-3.0')).toBe(false);
    // Parentheses issues
    expect(service.parse('(MIT')).toBe(false);
    expect(service.parse('MIT)')).toBe(false);
    expect(service.parse('((MIT)')).toBe(false);
    expect(service.parse('(MIT))')).toBe(false);
    expect(service.parse('())')).toBe(false);
    expect(service.parse('(()')).toBe(false);
    expect(service.parse('MIT AND ()')).toBe(false);
    expect(service.parse('(AND MIT)')).toBe(false);
    // WITH issues
    expect(service.parse('MIT WITH')).toBe(false);
    expect(service.parse('WITH exception')).toBe(false);
    expect(service.parse('MIT WITH WITH exception')).toBe(false);
    expect(service.parse('MIT AND WITH exception')).toBe(false);
    // Plus issues
    expect(service.parse('+')).toBe(false);
    expect(service.parse('MIT ++')).toBe(false);
    expect(service.parse('+ MIT')).toBe(false);
    expect(service.parse('MIT + Apache-2.0')).toBe(false);
    // Empty/whitespace
    expect(service.parse('')).toBe(false);
    expect(service.parse('   ')).toBe(false);
    expect(service.parse('\n')).toBe(false);
    // Invalid characters
    expect(service.parse('MIT@2.0')).toBe(false);
    expect(service.parse('MIT#Apache')).toBe(false);
    expect(service.parse('MIT & GPL')).toBe(false);
    expect(service.parse('MIT; Apache-2.0')).toBe(false);
    expect(service.parse('MIT, Apache-2.0')).toBe(false);
    // Complex invalid combinations
    expect(service.parse('(MIT OR)')).toBe(false);
    expect(service.parse('(AND Apache-2.0)')).toBe(false);
    expect(service.parse('MIT (OR Apache-2.0)')).toBe(false);
    expect(service.parse('MIT AND (OR GPL-3.0)')).toBe(false);
    expect(service.parse('((MIT AND Apache-2.0)')).toBe(false);
    expect(service.parse('MIT OR (Apache-2.0 AND)')).toBe(false);
    // Multiple WITH
    expect(service.parse('MIT WITH exception WITH another')).toBe(false);
    // Mixed errors
    expect(service.parse('MIT AND OR Apache-2.0')).toBe(false);
    expect(service.parse('(MIT AND (Apache-2.0 OR)')).toBe(false);
    expect(service.parse('MIT +AND Apache-2.0')).toBe(false);
    expect(
      service.parse('MIT WITH DocumentRef-spdx-tool-1.2:LicenseRef-MIT-Style-2')
    ).toBe(false);
    expect(service.parse('MIT WITH DocumentRef-spdx-tool-1.2')).toBe(false);
  });
});
