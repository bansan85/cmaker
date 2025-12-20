import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CMakeProject } from './features/cmake-project/components/cmake-project';

@Component({
  selector: 'app-root',
  imports: [CMakeProject],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {}
