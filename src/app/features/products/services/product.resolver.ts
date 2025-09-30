import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {catchError, EMPTY, Observable, of} from 'rxjs';
import {ProductFacade, ProductType} from '@features/products';

@Injectable({
  providedIn: 'root'
})
export class ProductResolver implements Resolve<ProductType | null> {
  private facade = inject(ProductFacade);
  private router = inject(Router);

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProductType | null> {
    const uuid = route.paramMap.get('uuid');

    if (!uuid || uuid === 'new') {
      return of(null);
    }

    return this.facade.getProduct(uuid)
      .pipe(
        catchError((error) => {
          console.error('Error loading product detail', error);
          this.router.navigate(['/products']).then();
          return EMPTY;
        })
      );
  }
}
