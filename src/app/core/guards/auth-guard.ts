import {inject, Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from '@core/services';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private authService = inject(AuthService);
  private router = inject(Router);

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    }
    this.router.navigate(['/login']).then();
    return false;
  }
}
