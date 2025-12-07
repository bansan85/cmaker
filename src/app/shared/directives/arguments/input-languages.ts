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
  readonly isValid = signal(false);
  enabled = true;
  abstract readonly name: string;
  abstract service: CMakeFeatureInterface<unknown>;

  constructor() {
    effect(() => {
      this.service
        .isValid(this)
        .then((result) => {
          this.isValid.set(result);
        })
        .catch((err: unknown) => {
          console.error(err);
        });
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
    for (const item of this.allLanguages) {
      item.enabled = values.includes(item.name);
    }
  }

  protected readonly c = signal<CheckboxesItemInterface>({
    enabled: false,
    name: 'C',
  });
  protected readonly cxx = signal<CheckboxesItemInterface>({
    enabled: false,
    name: 'CXX',
  });
  protected readonly cSharp = signal<CheckboxesItemInterface>({
    enabled: false,
    name: 'CSharp',
    version: new Version(3, 8),
  });
  protected readonly cuda = signal<CheckboxesItemInterface>({
    enabled: false,
    name: 'CUDA',
    version: new Version(3, 8),
  });
  protected readonly objC = signal<CheckboxesItemInterface>({
    enabled: false,
    name: 'OBJC',
    version: new Version(3, 16),
  });
  protected readonly objCxx = signal<CheckboxesItemInterface>({
    enabled: false,
    name: 'OBJCXX',
    version: new Version(3, 16),
  });
  protected readonly fortran = signal<CheckboxesItemInterface>({
    enabled: false,
    name: 'Fortran',
  });
  protected readonly hip = signal<CheckboxesItemInterface>({
    enabled: false,
    name: 'HIP',
    version: new Version(3, 21),
  });
  protected readonly ispc = signal<CheckboxesItemInterface>({
    enabled: false,
    name: 'ISPC',
    version: new Version(3, 18),
  });
  protected readonly swift = signal<CheckboxesItemInterface>({
    enabled: false,
    name: 'Swift',
    version: new Version(3, 15),
  });
  protected readonly asm = signal<CheckboxesItemInterface>({
    enabled: false,
    name: 'ASM',
  });
  protected readonly asmNasm = signal<CheckboxesItemInterface>({
    enabled: false,
    name: 'ASM_NASM',
  });
  protected readonly asmMarmasm = signal<CheckboxesItemInterface>({
    enabled: false,
    name: 'ASM_MARMASM',
    version: new Version(3, 26),
  });
  protected readonly asmMasm = signal<CheckboxesItemInterface>({
    enabled: false,
    name: 'ASM_MASM',
  });
  protected readonly asmAtt = signal<CheckboxesItemInterface>({
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
