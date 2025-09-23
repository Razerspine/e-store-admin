import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Button} from 'primeng/button';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {InputText} from 'primeng/inputtext';
import {Password} from 'primeng/password';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '@core/services';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, Button, IconField, InputIcon, InputText, Password, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    role: ['admin'],
  });

  register(): void {
    const formData = this.form.value;
    this.authService.register(formData);
  }
}
