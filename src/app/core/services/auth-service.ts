import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {UserType} from '@core/models';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';

const JWT_TOKEN = 'jwt_token';

type UserResponse = {
  user: UserType,
  token: string,
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private messageService = inject(MessageService);
  private router = inject(Router);
  user: WritableSignal<UserType | null> = signal(null);
  isLoggedIn: WritableSignal<boolean> = signal(!!this.getToken());

  login(params: { email: string; password: string }): void {
    this.http.post<UserResponse>(`${environment.apiBaseUrl}/api/auth/login`, params).subscribe({
      next: response => {
        if (response && response.token) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success!',
            detail: 'Login success! Welcome back!',
            life: 3000
          });
          this.user.set(response.user);
          localStorage.setItem(JWT_TOKEN, response.token);
          this.isLoggedIn.set(true);
          this.router.navigate(['/']).then();
        }
      },
      error: error => {
        console.error(error);
      }
    });
  }

  register(params: { email: string; password: string, role: string }): void {
    this.http.post<UserResponse>(`${environment.apiBaseUrl}/api/auth/register`, params).subscribe({
      next: response => {
        if (response && response.token) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success!',
            detail: 'Registration success! Enjoy!',
            life: 3000
          });
          this.user.set(response.user);
          localStorage.setItem(JWT_TOKEN, response.token);
          this.isLoggedIn.set(true);
          this.router.navigate(['/']).then();
        }
      },
      error: error => {
        console.error(error);
      }
    });
  }

  getToken(): string | null {
    return localStorage.getItem(JWT_TOKEN);
  }

  logout(): void {
    localStorage.removeItem(JWT_TOKEN);
    this.isLoggedIn.set(false);
    this.messageService.add({
      severity: 'success',
      summary: 'Success!',
      detail: 'Logout success! Come back as soon as possible!',
      life: 3000
    });
  }
}
