import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ValidatorInterface } from '../../interfaces/validator-interface';

@Component({
  selector: 'app-valid-tag',
  imports: [],
  templateUrl: './valid-tag.html',
  styleUrl: './valid-tag.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ValidTag {
  readonly validator = input.required<ValidatorInterface>();
}
