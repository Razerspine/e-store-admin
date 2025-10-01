import {Component, computed, inject, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {FormArray, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {CurrenciesFormTabsComponent, ImageUploaderComponent, LocalizationFormTabsComponent} from '@app/shared';
import {InputText} from 'primeng/inputtext';
import {Select} from 'primeng/select';
import {ToggleSwitch} from 'primeng/toggleswitch';
import {Button} from 'primeng/button';
import {fromForm, toForm, ProductFacade, ProductFormService, ProductType} from '@features/products';
import {SharedDataService} from '@core/services';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LocalizationFormTabsComponent, CurrenciesFormTabsComponent, InputText, Select, ToggleSwitch, ImageUploaderComponent, Button],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {
  private route = inject(ActivatedRoute);
  private facade = inject(ProductFacade);
  private formService = inject(ProductFormService);
  private shared = inject(SharedDataService);
  form = this.formService.createForm();
  categories = computed(() => this.shared.data().categories);
  productUuid = signal<string | null>(null);

  constructor() {
    this.formService.fillForm(this.form);
    const route = this.route.snapshot.paramMap.get('uuid');
    if (route && route !== 'new') {
      this.productUuid.set(route);
      const product: ProductType = this.route.snapshot.data['product'];
      this.patchForm(product);
    } else {
      this.productUuid.set(null);
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
    const formData = toForm(data);
    this.form?.patchValue(formData);
    console.log("AFTER PATCH: ", this.form.value);
  }

  save(): void {
    const product = fromForm(this.form.value);
    if (this.productUuid()) {
      this.facade.updateProduct(this.productUuid()!, product);
    } else {
      this.facade.createProduct(product);
    }
  }
}
