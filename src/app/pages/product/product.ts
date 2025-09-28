import {Component, computed, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ProductFormType, ProductType} from '@core/models';
import {productMapper} from '@core/mappers';
import {CurrenciesFormTabs, ImageUploader, LocalizationFormTabs} from '@app/shared';
import {InputText} from 'primeng/inputtext';
import {Select} from 'primeng/select';
import {ToggleSwitch} from 'primeng/toggleswitch';
import {Button} from 'primeng/button';
import {FormattingFormData} from '@core/utils';
import {ProductFormService, ProductService, SharedDataService} from '@core/services';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LocalizationFormTabs, CurrenciesFormTabs, InputText, Select, ToggleSwitch, ImageUploader, Button],
  templateUrl: './product.html',
  styleUrl: './product.scss'
})
export class Product {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private formService = inject(ProductFormService);
  private shared = inject(SharedDataService);
  form = this.formService.createForm();
  categories = computed(() => this.shared.data().categories);

  constructor() {
    this.formService.fillForm(this.form);
    const route = this.route.snapshot.paramMap.get('uuid');
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

  save(): void {
    const formData = FormattingFormData(this.form);
    const product = productMapper(formData, false) as Partial<ProductType>;
    if (product.uuid && product.uuid !== 'new') {
      this.productService.updateProduct(product.uuid, product);
    } else {
      this.productService.createProduct(product);
    }
  }
}
