import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { InputVersion } from '../../../shared/directives/arguments/input-version';
import { CMakeComponentInterface } from '../interfaces/cmake-component-interface';
import { FormsModule } from '@angular/forms';
import { OptionsMaxCMakeVersionService } from '../services/options-max-cmake-version-service';

@Component({
  selector: 'app-options-max-cmake-version',
  imports: [FormsModule],
  templateUrl: './options-max-cmake-version.html',
  styleUrl: './options-max-cmake-version.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionsMaxCMakeVersion
  extends InputVersion
  implements CMakeComponentInterface<OptionsMaxCMakeVersionService>
{
  readonly name = 'Max CMake version';

  protected readonly optionsMaxCMakeVersionId = `options-max-cmake-version-${crypto.randomUUID()}`;

  readonly service = inject(OptionsMaxCMakeVersionService);
}
