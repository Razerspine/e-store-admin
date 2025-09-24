import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {ProductFormType, ProductType} from '@core/models';
import {productMapper} from '@core/mappers';
import {CURRENCY_CONFIG, LANGUAGES_CONFIG} from '@core/configs';
import {CurrenciesFormTabs, LocalizationFormTabs} from '@app/shared';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LocalizationFormTabs, CurrenciesFormTabs],
  templateUrl: './product.html',
  styleUrl: './product.scss'
})
export class Product {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  form = this.fb.group({
    uuid: [''],
    name: this.fb.array([]),
    description: this.fb.array([]),
    category: [''],
    price: this.fb.array([]),
    sku: [''],
    images: this.fb.array([]),
    isActive: [false]
  });

  constructor() {
    const route = this.route.snapshot.paramMap.get('uuid');
    this.fillForm();
    if (route && route !== 'new') {
      const product: ProductType = this.route.snapshot.data['product'];
      this.patchForm(product);
    }
  }

  get imagesArray() {
    return this.form.get('images') as FormArray;
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
    const imagesArray = this.imagesArray;
    if (formData.images?.length > 0) {
      formData.images.forEach(image => {
        const imageGroup = this.fb.group({
          url: [image.url],
          publicId: [image.publicId],
        });
        imagesArray.push(imageGroup);
      });
    }
    this.form?.patchValue(formData);
    console.log("AFTER PATCH: ", this.form.value);
  }

  fillForm(): void {
    const nameArray = this.nameArray;
    const descriptionArray = this.descriptionArray;
    const priceArray = this.priceArray;
    LANGUAGES_CONFIG.forEach((lang) => {
      const nameGroup = this.fb.group({[lang.key]: ['']});
      const descriptionGroup = this.fb.group({[lang.key]: ['']});
      nameArray.push(nameGroup);
      descriptionArray.push(descriptionGroup);
    });
    CURRENCY_CONFIG.forEach((currency) => {
      const priceGroup = this.fb.group({[currency.key]: [null]});
      priceArray.push(priceGroup);
    });
  }
}
