import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IconField} from 'primeng/iconfield';
import {InputText} from 'primeng/inputtext';
import {InputIcon} from 'primeng/inputicon';
import {Password} from 'primeng/password';
import {Button} from 'primeng/button';
import {RouterLink} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '@core/services';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, IconField, InputText, InputIcon, Password, Button, RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  form: FormGroup = this.fb.group({
    email: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  login(): void {
    const formData = this.form.value;
    this.authService.login(formData);
  }
}
