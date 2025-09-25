import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ProductFormType, ProductType} from '@core/models';
import {productMapper} from '@core/mappers';
import {CATEGORIES_CONFIG, CURRENCY_CONFIG, LANGUAGES_CONFIG} from '@core/configs';
import {CurrenciesFormTabs, ImageUploader, LocalizationFormTabs} from '@app/shared';
import {InputText} from 'primeng/inputtext';
import {Select} from 'primeng/select';
import {ToggleSwitch} from 'primeng/toggleswitch';
import {Button} from 'primeng/button';
import {FormattingFormData} from '@core/utils';
import {ProductService} from '@core/services';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LocalizationFormTabs, CurrenciesFormTabs, InputText, Select, ToggleSwitch, ImageUploader, Button],
  templateUrl: './product.html',
  styleUrl: './product.scss'
})
export class Product {
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  protected readonly CATEGORIES_CONFIG = CATEGORIES_CONFIG;
  form = this.fb.group({
    uuid: [''],
    name: this.fb.array([]),
    description: this.fb.array([]),
    category: ['all'],
    price: this.fb.array([]),
    sku: [''],
    image: this.fb.group({
      url: [''],
      publicId: [''],
    }),
    isActive: [true]
  });

  constructor() {
    const route = this.route.snapshot.paramMap.get('uuid');
    this.fillForm();
    if (route && route !== 'new') {
      const product: ProductType = this.route.snapshot.data['product'];
      this.patchForm(product);
    }
  }

  imageGroup() {
    return this.form.get('image') as FormGroup;
  }

  get nameArray() {
    return this.form.get('name') as FormArray;
  }

  get descriptionArray() {
    return this.form.get('description') as FormArray;
  }

  get priceArray() {
    return this.form.get('price') as FormArray;
  }

  patchForm(data: ProductType): void {
    const formData = productMapper(data, true) as ProductFormType;
    this.form?.patchValue(formData);
    console.log("AFTER PATCH: ", this.form.value);
  }

  fillForm(): void {
    const nameArray = this.nameArray;
    const descriptionArray = this.descriptionArray;
    const priceArray = this.priceArray;
    LANGUAGES_CONFIG.forEach((lang) => {
      const nameGroup = this.fb.group({[lang.key]: ['', lang.isDefault ? Validators.required : null]});
      const descriptionGroup = this.fb.group({[lang.key]: ['', lang.isDefault ? Validators.required : null]});
      nameArray.push(nameGroup);
      descriptionArray.push(descriptionGroup);
    });
    CURRENCY_CONFIG.forEach((curr) => {
      const priceGroup = this.fb.group({[curr.key]: [null, curr.isDefault ? Validators.required : null]});
      priceArray.push(priceGroup);
    });
  }

  save(): void {
    const formData = FormattingFormData(this.form);
    const product = productMapper(formData, false) as ProductType;
    if (product.uuid && product.uuid !== 'new') {
      this.productService.updateProduct(product.uuid, product);
    } else {
      this.productService.createProduct(product);
    }
  }
}
