import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';
import {UserType} from '@features/users';
import {NotificationService} from '@core/services/notification.service';

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
  private notify = inject(NotificationService);
  private router = inject(Router);
  isLoggedIn: WritableSignal<boolean> = signal(!!this.getToken());
  user: WritableSignal<UserType | null> = signal(null);

  login(params: { email: string; password: string }): void {
    this.http.post<UserResponse>(`${environment.apiBaseUrl}/api/auth/login`, params).subscribe({
      next: response => {
        if (response && response.token) {
          this.notify.success('Login success! Welcome back!')
          localStorage.setItem(JWT_TOKEN, response.token);
          this.user.set(response.user);
          this.isLoggedIn.set(true);
          this.router.navigate(['/']).then();
        }
      },
      error: error => {
        console.error(error);
        this.notify.error(error?.error?.message);
      }
    });
  }

  register(params: { email: string; password: string, role: string }): void {
    this.http.post<UserResponse>(`${environment.apiBaseUrl}/api/auth/register`, params).subscribe({
      next: response => {
        if (response && response.token) {
          this.notify.success('Registration success! Enjoy!');
          localStorage.setItem(JWT_TOKEN, response.token);
          this.user.set(response.user);
          this.isLoggedIn.set(true);
          this.router.navigate(['/']).then();
        }
      },
      error: error => {
        console.error(error);
        this.notify.error(error?.error?.message);
      }
    });
  }

  getToken(): string | null {
    return localStorage.getItem(JWT_TOKEN);
  }

  logout(): void {
    localStorage.removeItem(JWT_TOKEN);
    this.user.set(null);
    this.isLoggedIn.set(false);
    this.notify.success('Logout success! Come back as soon as possible!')
    this.router.navigate(['/login']).then();
  }

  userInfo() {
    this.http.get<{ user: UserType }>(`${environment.apiBaseUrl}/api/auth/user-info`)
      .subscribe({
        next: response => {
          if (response && response.user) {
            this.user.set(response.user);
          }
        },
        error: error => {
          console.error(error);
          this.notify.error(error?.error?.message);
        }
      });
  }
}
