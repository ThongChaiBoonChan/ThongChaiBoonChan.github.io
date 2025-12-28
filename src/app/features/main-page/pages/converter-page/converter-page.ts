import { Component, signal } from '@angular/core';
import { ImportModeCard } from "../../components/import-mode-card/import-mode-card";
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-converter-page',
  imports: [ImportModeCard, UpperCasePipe],
  templateUrl: './converter-page.html',
  styleUrl: './converter-page.css',
})
export class ConverterPage {
  hasData = signal(false);

  currentMode = signal<'insert' | 'update' | 'upsert'>('insert');

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      console.log('File selected:', file.name);
      this.hasData.set(true); // Switch to the preview view
    }
  }
}
