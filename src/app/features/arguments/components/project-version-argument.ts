import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  inject,
} from '@angular/core';
import { CMakeComponentInterface } from '../../cmake-project/interfaces/cmake-component-interface';
import { ProjectVersionService } from '../services/project-version-service';
import { FormsModule } from '@angular/forms';
import { CMAKE_COMPONENT_ITEM } from '../../../app.tokens';
import { InputVersion } from '../../../shared/directives/arguments/input-version';
import { ValidTag } from '../../../shared/components/arguments/valid-tag';
import { VersionTag } from '../../../shared/components/arguments/version-tag';

@Component({
  selector: 'app-project-version-argument',
  imports: [FormsModule, ValidTag, VersionTag],
  templateUrl: './project-version-argument.html',
  styleUrl: './project-version-argument.css',
  providers: [
    {
      provide: CMAKE_COMPONENT_ITEM,
      useExisting: forwardRef(() => ProjectVersionArgument),
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectVersionArgument
  extends InputVersion
  implements CMakeComponentInterface<ProjectVersionService>
{
  readonly name = 'Version';

  protected readonly projectVersionId = `project-version-${crypto.randomUUID()}`;

  readonly service = inject(ProjectVersionService);
}
