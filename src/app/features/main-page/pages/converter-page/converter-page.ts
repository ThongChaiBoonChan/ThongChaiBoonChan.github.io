import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-converter-page',
  imports: [],
  templateUrl: './converter-page.html',
  styleUrl: './converter-page.css',
})
export class ConverterPage {
  hasData = signal(false);

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      console.log('File selected:', file.name);
      this.hasData.set(true); // Switch to the preview view
    }
  }
}
