import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CMAKE_COMPONENT_ITEM } from '../../../app.tokens';
import { ValidTag } from '../../../shared/components/arguments/valid-tag';
import { VersionTag } from '../../../shared/components/arguments/version-tag';
import { InputString } from '../../../shared/directives/arguments/input-string';
import { AsyncInvalidValidator } from '../../../shared/directives/validators/async-invalid-validator';
import { CMakeComponentInterface } from '../../cmake-project/models/cmake-component-interface';
import { ProjectHomepageUrlService } from '../services/project-homepage-url-service';

@Component({
  selector: 'app-project-homepage-url-argument',
  imports: [FormsModule, ValidTag, VersionTag, AsyncInvalidValidator],
  templateUrl: './project-homepage-url-argument.html',
  styleUrl: './project-homepage-url-argument.css',
  providers: [
    {
      provide: CMAKE_COMPONENT_ITEM,
      useExisting: forwardRef(() => ProjectHomepageUrlArgument),
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectHomepageUrlArgument
  extends InputString
  implements CMakeComponentInterface<ProjectHomepageUrlService>
{
  readonly itemName = 'Homepage';

  protected readonly projectHomepageUrlId = `project-homepage-url-${crypto.randomUUID()}`;

  readonly service = inject(ProjectHomepageUrlService);

  protected readonly validatorForHomepageUrl = this.service.validateArg[0];
}
