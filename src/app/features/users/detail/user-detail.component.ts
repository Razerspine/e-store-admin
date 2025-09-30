import {Component, computed, inject, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {UserFacade, UserFormService, UserType} from '@features/users';
import {ReactiveFormsModule, Validators} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {Select} from 'primeng/select';
import {SharedDataService} from '@core/services';
import {ROLE_CONFIG} from '@core/configs';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputText, Select, Button],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {
  private route = inject(ActivatedRoute);
  private formService = inject(UserFormService);
  private shared = inject(SharedDataService);
  private facade = inject(UserFacade);
  form = this.formService.createForm();
  roles = signal(ROLE_CONFIG);
  languages = computed(() => this.shared.data().languages);
  currencies = computed(() => this.shared.data().currencies);
  userId = signal<string | null>(null);

  constructor() {
    const route = this.route.snapshot.paramMap.get('userId');
    if (route && route !== 'new') {
      this.userId.set(route);
      const user: UserType = this.route.snapshot.data['user'];
      this.patchForm(user);
    } else {
      this.userId.set(null);
      this.form.get('password')?.addValidators([Validators.required, Validators.minLength(6)]);
      this.form?.updateValueAndValidity();
    }
  }

  patchForm(data: UserType) {
    this.form?.patchValue(data);
    console.log('AFTER PATCH: ', this.form.value);
  }

  save(): void {
    const formData = this.form?.value;
    console.log(formData);
    if (this.userId()) {
      this.facade.updateUser(this.userId()!, formData);
    } else {
      this.facade.createUser(formData);
    }
  }
}
