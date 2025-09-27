import {inject} from '@angular/core';
import {HttpInterceptorFn} from '@angular/common/http';
import {AuthService} from '@core/services/auth-service';
import {catchError, throwError} from 'rxjs';
import {Router} from '@angular/router';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = authService.getToken();
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  return next(req)
    .pipe(
      catchError((error) => {
        if (error.status === 401 && error.error?.message?.includes('TokenExpiredError')) {
          authService.logout();
          router.navigate(['/login']).then();
        }
        return throwError(() => error);
      })
    );
};
