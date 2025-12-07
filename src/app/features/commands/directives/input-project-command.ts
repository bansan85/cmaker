import { Directive, signal, WritableSignal } from '@angular/core';
import { ValidatorInterface } from '../../../shared/interfaces/validator-interface';
import { ProjectModel } from '../models/project.model';
import { InputStringModel } from '../../../shared/models/arguments/input-string-model';
import { InputVersionModel } from '../../../shared/models/arguments/input-version-model';
import { InputLanguagesModel } from '../../../shared/models/arguments/input-languages-model';

@Directive({
  selector: '[appInputProjectCommand]',
})
export abstract class InputProjectCommand
  implements ProjectModel, ValidatorInterface
{
  isValid = signal(false);

  enabled = true;

  abstract name: InputStringModel;
  abstract version?: InputVersionModel;
  abstract compatVersion?: InputVersionModel;
  abstract spdxLicense?: InputStringModel;
  abstract description?: InputStringModel;
  abstract homepageUrl?: InputStringModel;
  abstract languages?: InputLanguagesModel;
}
