import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-import-mode-card',
  imports: [],
  templateUrl: './import-mode-card.html',
  styleUrl: './import-mode-card.css',
})
export class ImportModeCard {
  title = input.required<string>();
  description = input.required<string>();
  colorClass = input<string>('radio-primary');
  active = input<boolean>(false);
  select = output<void>();
}
