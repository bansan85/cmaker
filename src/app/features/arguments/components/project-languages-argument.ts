import { Component, effect, forwardRef, inject, signal } from '@angular/core';
import { CMakeComponentInterface } from '../../cmake-project/interfaces/cmake-component-interface';
import { ProjectLanguagesService } from '../services/project-languages-service';
import { CheckboxesItemInterface } from '../../../shared/interface/checkboxes-item-interface';
import { CheckboxesList } from '../../../shared/components/checkbox/checkboxes-list';
import { CheckboxesItem } from '../../../shared/components/checkbox/checkboxes-item';
import { Version } from '../../../shared/models/version';
import { ProjectLanguagesModel } from '../models/project-languages.model';
import { CMAKE_COMPONENT_ITEM } from '../../../app.tokens';

@Component({
  selector: 'app-project-languages-argument',
  imports: [CheckboxesList, CheckboxesItem],
  templateUrl: './project-languages-argument.html',
  styleUrl: './project-languages-argument.css',
  providers: [
    {
      provide: CMAKE_COMPONENT_ITEM,
      useExisting: forwardRef(() => ProjectLanguagesArgument),
    },
  ],
})
export class ProjectLanguagesArgument
  implements
    CMakeComponentInterface<ProjectLanguagesService>,
    CheckboxesItemInterface,
    ProjectLanguagesModel
{
  readonly name = 'Languages';

  protected readonly projectLanguagesId = `project-languages-${crypto.randomUUID()}`;

  readonly service = inject(ProjectLanguagesService);

  constructor() {
    effect(async () => {
      this.isValid.set(await this.service.isValid(this));
    });
  }

  protected isValid = signal(true);

  enabled = true;

  get value(): string {
    return this.toString();
  }

  protected c = signal<CheckboxesItemInterface>({
    enabled: false,
    name: 'C',
  });
  protected cxx = signal<CheckboxesItemInterface>({
    enabled: false,
    name: 'CXX',
  });
  protected cSharp = signal<CheckboxesItemInterface>({
    enabled: false,
    name: 'CSharp',
    version: new Version(3, 8),
  });
  protected cuda = signal<CheckboxesItemInterface>({
    enabled: false,
    name: 'CUDA',
    version: new Version(3, 8),
  });
  protected objC = signal<CheckboxesItemInterface>({
    enabled: false,
    name: 'OBJC',
    version: new Version(3, 16),
  });
  protected objCxx = signal<CheckboxesItemInterface>({
    enabled: false,
    name: 'OBJCXX',
    version: new Version(3, 16),
  });
  protected fortran = signal<CheckboxesItemInterface>({
    enabled: false,
    name: 'Fortran',
  });
  protected hip = signal<CheckboxesItemInterface>({
    enabled: false,
    name: 'HIP',
    version: new Version(3, 21),
  });
  protected ispc = signal<CheckboxesItemInterface>({
    enabled: false,
    name: 'ISPC',
    version: new Version(3, 18),
  });
  protected swift = signal<CheckboxesItemInterface>({
    enabled: false,
    name: 'Swift',
    version: new Version(3, 15),
  });
  protected asm = signal<CheckboxesItemInterface>({
    enabled: false,
    name: 'ASM',
  });
  protected asmNasm = signal<CheckboxesItemInterface>({
    enabled: false,
    name: 'ASM_NASM',
  });
  protected asmMarmasm = signal<CheckboxesItemInterface>({
    enabled: false,
    name: 'ASM_MARMASM',
    version: new Version(3, 26),
  });
  protected asmMasm = signal<CheckboxesItemInterface>({
    enabled: false,
    name: 'ASM_MASM',
  });
  protected asmAtt = signal<CheckboxesItemInterface>({
    enabled: false,
    name: 'ASM-ATT',
  });

  private allLanguages = [
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
      this.allLanguages
        .filter((item) => item.enabled)
        .map((item) => item.name)
        .join(' ') || 'NONE'
    );
  }
}
