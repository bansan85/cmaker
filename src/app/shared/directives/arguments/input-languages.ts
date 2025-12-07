import { Directive, effect, signal } from '@angular/core';
import { CheckboxesItemInterface } from '../../interfaces/checkboxes-item-interface';
import { Version } from '../../models/version';
import { InputLanguagesModel } from '../../models/arguments/input-languages-model';
import { CMakeFeatureInterface } from '../../../features/commands/services/cmake-feature-interface';
import { ValidatorInterface } from '../../interfaces/validator-interface';

@Directive({
  selector: '[appInputLanguages]',
})
export abstract class InputLanguages
  implements CheckboxesItemInterface, InputLanguagesModel, ValidatorInterface
{
  isValid = signal(false);
  enabled = true;
  abstract readonly name: string;
  abstract service: CMakeFeatureInterface<unknown>;

  constructor() {
    effect(async () => {
      this.isValid.set(await this.service.isValid(this));
    });
  }

  get value(): string {
    return (
      this.allLanguages
        .filter((item) => item.enabled)
        .map((item) => item.name)
        .join(' ') || 'NONE'
    );
  }
  set value(value: string) {
    const values = value.split(' ');
    this.allLanguages.forEach((item) => {
      item.enabled = values.indexOf(item.name) != -1;
    });
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
}
