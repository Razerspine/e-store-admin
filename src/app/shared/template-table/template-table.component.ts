import {Component, input, InputSignal, output, TemplateRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableModule} from 'primeng/table';
import {Button} from 'primeng/button';
import {TableConfigType} from '@core/models';

@Component({
  selector: 'app-template-table',
  standalone: true,
  imports: [CommonModule, TableModule, Button],
  templateUrl: './template-table.component.html',
  styleUrl: './template-table.component.scss'
})
export class TemplateTableComponent<T, C> {
  config: InputSignal<TableConfigType<T, C>> = input.required();
  captionTemplate: InputSignal<TemplateRef<unknown> | null> = input<TemplateRef<unknown> | null>(null);
  headerTemplate: InputSignal<TemplateRef<{ $implicit: C[] }>> = input.required();
  bodyTemplate: InputSignal<TemplateRef<{ $implicit: T; columns: C[]; index: number }>> = input.required();
  showSelections: InputSignal<boolean> = input(true);
  showActions: InputSignal<boolean> = input(true);

  delete = output<{ event: Event; items: T[] }>();
  details = output<T>();
}
