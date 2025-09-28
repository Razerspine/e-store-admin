import {inject, Injectable} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SharedDataService} from '@core/services/shared-data.service';

@Injectable({
  providedIn: 'root'
})
export class ProductFormService {
  private fb = inject(FormBuilder);
  private shared = inject(SharedDataService);

  createForm(): FormGroup {
    return this.fb.group({
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
  }

  fillForm(form: FormGroup): void {
    const nameArray = form.get('name') as FormArray;
    const descriptionArray = form.get('description') as FormArray;
    const priceArray = form.get('price') as FormArray;

    this.shared.data().languages.forEach(lang => {
      nameArray.push(this.fb.group({[lang.key]: ['', lang.isDefault ? Validators.required : null]}));
      descriptionArray.push(this.fb.group({[lang.key]: ['', lang.isDefault ? Validators.required : null]}));
    });

    this.shared.data().currencies.forEach(curr => {
      priceArray.push(this.fb.group({[curr.key]: [null, curr.isDefault ? Validators.required : null]}));
    });
  }
}
