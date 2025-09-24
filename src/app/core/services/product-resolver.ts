import {inject, Injectable} from '@angular/core';
import {ProductService} from '@core/services/product-service';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {ProductType} from '@core/models';
import {catchError, EMPTY, Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductResolver implements Resolve<ProductType | null> {
  private productService = inject(ProductService);
  private router = inject(Router);

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProductType | null> {
    const uuid = route.paramMap.get('uuid');

    if (!uuid || uuid === 'new') {
      return of(null);
    }

    return this.productService.getProductByUuid(uuid).pipe(
      catchError((error) => {
        console.error('Error loading product', error);
        this.router.navigate(['/products']).then();
        return EMPTY;
      })
    );
  }
}
