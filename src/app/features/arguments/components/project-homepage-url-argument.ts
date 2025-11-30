import { Component, forwardRef, inject } from '@angular/core';
import { ProjectHomepageUrlService } from '../services/project-homepage-url-service';
import { CMakeComponentInterface } from '../../cmake-project/interfaces/cmake-component-interface';
import { FormsModule } from '@angular/forms';
import { CMAKE_COMPONENT_ITEM } from '../../../app.tokens';
import { InputString } from '../../../shared/directives/arguments/input-string';
import { ValidTag } from '../../../shared/components/arguments/valid-tag';

@Component({
  selector: 'app-project-homepage-url-argument',
  imports: [FormsModule, ValidTag],
  templateUrl: './project-homepage-url-argument.html',
  styleUrl: './project-homepage-url-argument.css',
  providers: [
    {
      provide: CMAKE_COMPONENT_ITEM,
      useExisting: forwardRef(() => ProjectHomepageUrlArgument),
    },
  ],
})
export class ProjectHomepageUrlArgument
  extends InputString
  implements CMakeComponentInterface<ProjectHomepageUrlService>
{
  readonly name = 'Homepage';

  protected readonly projectHomepageUrlId = `project-homepage-url-${crypto.randomUUID()}`;

  readonly service = inject(ProjectHomepageUrlService);
}
