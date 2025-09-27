import {Component, inject, input, InputSignal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormArray, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Tab, TabList, TabPanel, TabPanels, Tabs} from 'primeng/tabs';
import {InputText} from 'primeng/inputtext';
import {SharedDataService} from '@core/services';
import {Editor} from 'primeng/editor';

@Component({
  selector: 'app-localization-form-tabs',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Tabs, TabList, Tab, TabPanels, TabPanel, InputText, Editor],
  templateUrl: './localization-form-tabs.html',
  styleUrl: './localization-form-tabs.scss'
})
export class LocalizationFormTabs {
  formArray: InputSignal<FormArray> = input.required();
  title: InputSignal<string> = input.required();
  editor: InputSignal<boolean> = input.required();
  sharedService = inject(SharedDataService);
  languages = this.sharedService.data().languages;

  getGroup(index: number): FormGroup {
    return this.formArray().at(index) as FormGroup;
  }
}
