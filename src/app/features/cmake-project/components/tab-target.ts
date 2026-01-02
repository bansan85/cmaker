import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-tab-target',
  imports: [],
  templateUrl: './tab-target.html',
  styleUrl: './tab-target.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabTarget {}
