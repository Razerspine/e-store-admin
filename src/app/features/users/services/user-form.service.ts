import {inject, Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class UserFormService {
  private fb = inject(FormBuilder)

  createForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [''],
      role: ['admin'],
      language: ['en'],
      currency: ['USD'],
    });
  }
}
