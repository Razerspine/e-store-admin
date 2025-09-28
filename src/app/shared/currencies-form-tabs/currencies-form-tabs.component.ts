import {Component, input, InputSignal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormArray, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {CURRENCY_CONFIG} from '@core/configs';
import {InputText} from 'primeng/inputtext';
import {Tab, TabList, TabPanel, TabPanels, Tabs} from 'primeng/tabs';

@Component({
  selector: 'app-currencies-form-tabs',
  standalone: true,
  imports: [CommonModule, InputText, ReactiveFormsModule, Tab, TabList, TabPanel, TabPanels, Tabs],
  templateUrl: './currencies-form-tabs.component.html',
  styleUrl: './currencies-form-tabs.component.scss'
})
export class CurrenciesFormTabsComponent {
  formArray: InputSignal<FormArray> = input.required();
  title: InputSignal<string> = input.required();
  currencies = CURRENCY_CONFIG;

  getGroup(index: number): FormGroup {
    return this.formArray().at(index) as FormGroup;
  }
}
