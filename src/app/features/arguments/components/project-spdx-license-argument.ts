import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  inject,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CMAKE_COMPONENT_ITEM } from '../../../app.tokens';
import { InputSpdxLicenseDataList } from '../../../shared/components/arguments/input-spdx-license-data-list';
import { ValidTag } from '../../../shared/components/arguments/valid-tag';
import { VersionTag } from '../../../shared/components/arguments/version-tag';
import { InputLicense } from '../../../shared/directives/arguments/input-license';
import { AsyncInvalidValidator } from '../../../shared/directives/validators/async-invalid-validator';
import { ProjectSpdxLicenseService } from '../services/project-spdx-license-service';

@Component({
  selector: 'app-project-spdx-license-argument',
  imports: [
    FormsModule,
    InputSpdxLicenseDataList,
    ValidTag,
    VersionTag,
    AsyncInvalidValidator,
  ],
  templateUrl: './project-spdx-license-argument.html',
  styleUrl: './project-spdx-license-argument.css',
  providers: [
    {
      provide: CMAKE_COMPONENT_ITEM,
      useExisting: forwardRef(() => ProjectSpdxLicenseArgument),
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectSpdxLicenseArgument extends InputLicense {
  protected readonly datalist = viewChild<InputSpdxLicenseDataList>('datalist');

  readonly itemName = 'License';

  protected readonly projectSpdxLicenseId = `project-spdx-license-${crypto.randomUUID()}`;

  readonly service = inject(ProjectSpdxLicenseService);

  protected readonly validatorForSpdxLicense = this.service.validateArg[0];
}
