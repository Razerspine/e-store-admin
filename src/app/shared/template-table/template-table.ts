import {Component, input, InputSignal, output, TemplateRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductType, TableConfigType} from '@core/models';
import {TableModule} from 'primeng/table';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-template-table',
  standalone: true,
  imports: [CommonModule, TableModule, Button],
  templateUrl: './template-table.html',
  styleUrl: './template-table.scss'
})
export class TemplateTable {
  config: InputSignal<TableConfigType> = input.required();
  captionTemplate: InputSignal<TemplateRef<unknown> | null> = input<TemplateRef<unknown> | null>(null);
  headerTemplate: InputSignal<TemplateRef<{ $implicit: any[] }>> = input.required();
  bodyTemplate: InputSignal<TemplateRef<{ $implicit: any; columns: any[]; index: any[] }>> = input.required();
  showSelections: InputSignal<boolean> = input(true);
  showActions: InputSignal<boolean> = input(true);
  delete = output<{ event: Event; products: ProductType[] }>();
  details = output<ProductType>();
}
