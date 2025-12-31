import { Component, signal } from '@angular/core';
import { ImportModeCard } from "../../components/import-mode-card/import-mode-card";
import { UpperCasePipe } from '@angular/common';
import { ExcelService } from '../../../../services/excel-service';

@Component({
  selector: 'app-converter-page',
  imports: [ImportModeCard, UpperCasePipe],
  templateUrl: './converter-page.html',
  styleUrl: './converter-page.css',
})
export class ConverterPage {
  currentMode = signal<'insert' | 'update' | 'upsert'>('insert');
fileName = signal<string | null>(null);
  hasData = signal(false);
  constructor(
    private excelService: ExcelService
  ) {}

  // Data State
  tableData = signal<any[]>([]);
  tableHeaders = signal<string[]>([]);

  async onUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      const data = await this.excelService.parseExcel(file);
      this.tableData.set(data);
      
      // Extract keys from the first row to create table headers
      if (data.length > 0) {
        this.tableHeaders.set(Object.keys(data[0]));
      }
    }
  }
}
