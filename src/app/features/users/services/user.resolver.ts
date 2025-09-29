import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {UserFacade, UserType} from '@features/users';
import {catchError, EMPTY, Observable, of} from 'rxjs';

@Injectable({providedIn: 'root'})
export class UserResolver implements Resolve<UserType | null> {
  private facade = inject(UserFacade);
  private router = inject(Router);

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserType | null> {
    const userId = route.paramMap.get('id');

    if (!userId || userId === 'new') {
      return of(null);
    }

    return this.facade.getUser(userId).pipe(
      catchError((error) => {
        console.error('Error loading user detail', error);
        this.router.navigate(['/users']).then();
        return EMPTY;
      })
    );
  }
}
