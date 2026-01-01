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
  ) { }

  // Data State
  tableData = signal<any[]>([]);
  tableHeaders = signal<string[]>([]);

  async onUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.fileName.set(file.name); // Store the name
      this.hasData.set(true);
      const data = await this.excelService.parseExcel(file);
      this.tableData.set(data);

      // Extract keys from the first row to create table headers
      if (data.length > 0) {
        this.tableHeaders.set(Object.keys(data[0]));
      }
    }
  }

  resetFile() {
    this.fileName.set(null);
    this.hasData.set(false);
  }


  generatedSql = signal<string>('');

  onProcess(tableName: string) {
    const name = tableName || 'YOUR_TABLE_NAME';
    const sql = this.generateOracleSql(this.tableData(), name);
    this.generatedSql.set(sql);
  }

  copyToClipboard() {
    navigator.clipboard.writeText(this.generatedSql());
    // Optional: Add a daisyUI toast notification here
    alert('SQL copied to clipboard!');
  }

  generateOracleSql(data: any[], tableName: string): string {
    if (!data || data.length === 0) return '';

    const columns = Object.keys(data[0]);
    const columnString = columns.join(', ');

    const sqlStatements = data.map(row => {
      const values = columns.map(col => {
        const val = row[col];

        // 1. Handle Nulls
        if (val === null || val === undefined) return 'NULL';

        // 2. Handle Numbers
        if (typeof val === 'number') return val;

        // 3. Handle Dates (Oracle specific)
        // Basic check if string looks like a date
        if (this.isDate(val)) {
          return `TO_DATE('${val}', 'YYYY-MM-DD HH24:MI:SS')`;
        }

        // 4. Handle Strings (Escape single quotes)
        const escapedVal = String(val).replace(/'/g, "''");
        return `'${escapedVal}'`;
      });

      return `INSERT INTO ${tableName} (${columnString}) VALUES (${values.join(', ')});`;
    });

    return sqlStatements.join('\n') + '\nCOMMIT;';
  }

  // Simple helper to detect dates
  private isDate(val: any): boolean {
    return !isNaN(Date.parse(val)) && String(val).includes('-');
  }
}
