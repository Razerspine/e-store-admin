import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {UserType} from '@core/models';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

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
  user: WritableSignal<UserType | null> = signal(null);
  isLoggedIn: WritableSignal<boolean> = signal(!!this.getToken());

  login(params: { email: string; password: string }): void {
    this.http.post<UserResponse>(`${environment.apiBaseUrl}/api/auth/login`, params).subscribe({
      next: response => {
        if (response && response.token) {
          this.user.set(response.user);
          localStorage.setItem(JWT_TOKEN, response.token);
          this.isLoggedIn.set(true);
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
          this.user.set(response.user);
          localStorage.setItem(JWT_TOKEN, response.token);
          this.isLoggedIn.set(true);
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
  }
}
