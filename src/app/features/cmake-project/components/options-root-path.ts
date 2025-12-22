import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CMakeComponentInterface } from '../interfaces/cmake-component-interface';
import { OptionsRootPathService } from '../services/options-root-path-service';
import { InputDirectory } from '../../../shared/directives/arguments/input-directory';
import { AsyncInvalidValidator } from '../../../shared/directives/validators/async-invalid-validator';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-options-root-path',
  imports: [AsyncInvalidValidator, FormsModule],
  templateUrl: './options-root-path.html',
  styleUrl: './options-root-path.css',
  providers: [OptionsRootPathService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionsRootPath
  extends InputDirectory
  implements CMakeComponentInterface<OptionsRootPathService>
{
  readonly name = 'Root path';

  protected readonly optionsRootPathId = `options-root-path-${crypto.randomUUID()}`;

  readonly service = inject(OptionsRootPathService);
}
