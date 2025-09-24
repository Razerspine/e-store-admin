import {Component, input, InputSignal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormArray, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Tab, TabList, TabPanel, TabPanels, Tabs} from 'primeng/tabs';
import {LANGUAGES_CONFIG} from '@core/configs';
import {InputText} from 'primeng/inputtext';

@Component({
  selector: 'app-localization-form-tabs',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Tabs, TabList, Tab, TabPanels, TabPanel, InputText],
  templateUrl: './localization-form-tabs.html',
  styleUrl: './localization-form-tabs.scss'
})
export class LocalizationFormTabs {
  formArray: InputSignal<FormArray> = input.required();
  title: InputSignal<string> = input.required();
  languages = LANGUAGES_CONFIG;

  getGroup(index: number): FormGroup {
    return this.formArray().at(index) as FormGroup;
  }
}
