import { Component, inject, signal } from '@angular/core';
import { CMakeComponentInterface } from '../../cmake-project/interfaces/cmake-component-interface';
import { ProjectLanguagesService } from '../services/project-languages-service';
import { CheckboxesItemInterface } from '../../../shared/interface/checkboxes-item-interface';
import { ProjectContextService } from '../../cmake-project/services/project-context-service';
import { VersionService } from '../../../shared/services/version-service';
import { CheckboxesList } from '../../../shared/components/checkbox/checkboxes-list';
import { CheckboxesItem } from '../../../shared/components/checkbox/checkboxes-item';
import { Version } from '../../../shared/models/version';

@Component({
  selector: 'app-project-languages-argument',
  imports: [CheckboxesList, CheckboxesItem],
  templateUrl: './project-languages-argument.html',
  styleUrl: './project-languages-argument.css',
})
export class ProjectLanguagesArgument
  implements
    CMakeComponentInterface<ProjectLanguagesService>,
    CheckboxesItemInterface
{
  service = inject(ProjectLanguagesService);
  projectContext = inject(ProjectContextService);
  versionService = inject(VersionService);

  enabled = true;
  readonly name: string = 'Languages';

  c = signal<CheckboxesItemInterface>({
    enabled: false,
    name: 'C',
  });
  cxx = signal<CheckboxesItemInterface>({
    enabled: false,
    name: 'CXX',
  });
  cSharp = signal<CheckboxesItemInterface>({
    enabled: false,
    name: 'CSharp',
    version: new Version(3, 8),
  });
  cuda = signal<CheckboxesItemInterface>({
    enabled: false,
    name: 'CUDA',
    version: new Version(3, 8),
  });
  objC = signal<CheckboxesItemInterface>({
    enabled: false,
    name: 'OBJC',
    version: new Version(3, 16),
  });
  objCxx = signal<CheckboxesItemInterface>({
    enabled: false,
    name: 'OBJCXX',
    version: new Version(3, 16),
  });
  fortran = signal<CheckboxesItemInterface>({
    enabled: false,
    name: 'Fortran',
  });
  hip = signal<CheckboxesItemInterface>({
    enabled: false,
    name: 'HIP',
    version: new Version(3, 21),
  });
  ispc = signal<CheckboxesItemInterface>({
    enabled: false,
    name: 'ISPC',
    version: new Version(3, 18),
  });
  swift = signal<CheckboxesItemInterface>({
    enabled: false,
    name: 'Swift',
    version: new Version(3, 15),
  });
  asm = signal<CheckboxesItemInterface>({
    enabled: false,
    name: 'ASM',
  });
  asmNasm = signal<CheckboxesItemInterface>({
    enabled: false,
    name: 'ASM_NASM',
  });
  asmMarmasm = signal<CheckboxesItemInterface>({
    enabled: false,
    name: 'ASM_MARMASM',
    version: new Version(3, 26),
  });
  asmMasm = signal<CheckboxesItemInterface>({
    enabled: false,
    name: 'ASM_MASM',
  });
  asmAtt = signal<CheckboxesItemInterface>({
    enabled: false,
    name: 'ASM-ATT',
  });

  items = [
    this.c(),
    this.cxx(),
    this.cSharp(),
    this.cuda(),
    this.objC(),
    this.objCxx(),
    this.fortran(),
    this.hip(),
    this.ispc(),
    this.swift(),
    this.asm(),
    this.asmNasm(),
    this.asmMarmasm(),
    this.asmMasm(),
    this.asmAtt(),
  ];

  toString(): string {
    return (
      this.items
        .filter((item) => item.enabled)
        .map((item) => item.name)
        .join(' ') || 'NONE'
    );
  }
}
