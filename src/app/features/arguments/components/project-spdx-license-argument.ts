import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  inject,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProjectSpdxLicenseService } from '../services/project-spdx-license-service';
import { CMakeComponentInterface } from '../../cmake-project/interfaces/cmake-component-interface';
import { CMAKE_COMPONENT_ITEM } from '../../../app.tokens';
import { InputLicenseDataList } from '../../../shared/components/arguments/input-license-data-list/input-license-data-list';
import { InputLicense } from '../../../shared/directives/arguments/input-license';
import { ValidTag } from '../../../shared/components/arguments/valid-tag';
import { VersionTag } from '../../../shared/components/arguments/version-tag';
import { AsyncInvalidValidator } from '../../../shared/directives/validators/async-invalid-validator';

@Component({
  selector: 'app-project-spdx-license-argument',
  imports: [
    FormsModule,
    InputLicenseDataList,
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
export class ProjectSpdxLicenseArgument
  extends InputLicense
  implements CMakeComponentInterface<ProjectSpdxLicenseService>
{
  protected readonly datalist = viewChild<InputLicenseDataList>('datalist');

  readonly name = 'License';

  protected readonly projectSpdxLicenseId = `project-spdx-license-${crypto.randomUUID()}`;

  readonly service = inject(ProjectSpdxLicenseService);
}
