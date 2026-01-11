import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { CMakeComponentInterface } from '../../cmake-project/models/cmake-component-interface';
import { FullProjectService } from '../services/full-project-service';

@Component({
  selector: 'app-full-project-view',
  imports: [],
  templateUrl: './full-project-view.html',
  styleUrl: './full-project-view.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FullProjectView
  implements CMakeComponentInterface<FullProjectService>
{
  service = inject(FullProjectService);
}
