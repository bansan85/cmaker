import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { FullProjectService } from '../services/full-project-service';

@Component({
  selector: 'app-full-project-view',
  imports: [],
  templateUrl: './full-project-view.html',
  styleUrl: './full-project-view.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FullProjectView {
  service = inject(FullProjectService);
}
