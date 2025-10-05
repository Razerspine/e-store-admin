import {Component, inject, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Button} from 'primeng/button';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {InputText} from 'primeng/inputtext';
import {Password} from 'primeng/password';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '@core/services';
import {matchPasswordValidator} from '@core/validators';
import {ROLE_CONFIG} from '@core/configs';
import {Select} from 'primeng/select';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, Button, IconField, InputIcon, InputText, Password, ReactiveFormsModule, Select],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  roles = signal(ROLE_CONFIG);
  form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    role: ['admin'],
  }, {validators: matchPasswordValidator});

  register(): void {
    const formData = this.form.value;
    delete formData.confirmPassword;
    this.authService.register(formData);
  }
}
