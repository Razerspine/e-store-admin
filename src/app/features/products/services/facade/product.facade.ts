import {inject, Injectable} from '@angular/core';
import {NotificationService} from '@core/services';
import {Router} from '@angular/router';
import {ProductApiService, ProductFiltersType, ProductStore, ProductType} from '@features/products';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductFacade {
  private store = inject(ProductStore);
  private api = inject(ProductApiService);
  private notify = inject(NotificationService);
  private router = inject(Router);

  products = this.store.products;
  paginator = this.store.paginator;

  loadProducts(filters: Partial<ProductFiltersType>): void {
    this.store.loadProducts(filters).subscribe({
      error: (error) => this.notify.error(error?.error?.message ?? 'Unknown error')
    });
  }

  getProduct(uuid: string): Observable<ProductType> {
    return this.api.getProduct(uuid);
  }

  createProduct(changes: Partial<ProductType>): void {
    this.api.createProduct(changes).subscribe({
      next: () => {
        this.router.navigate(['/products']).then();
        this.notify.success('Product created successfully');
      },
      error: (error) => this.notify.error(error?.error?.message ?? 'Unknown error')
    });
  }

  updateProduct(uuid: string, changes: Partial<ProductType>): void {
    this.api.updateProduct(uuid, changes).subscribe({
      next: () => {
        this.router.navigate(['/products']).then();
        this.notify.success('Product updated successfully');
      },
      error: (error) => this.notify.error(error?.error?.message ?? 'Unknown error')
    })
  }

  deleteProduct(uuid: string[]): void {
    this.api.deleteProduct(uuid).subscribe({
      next: (response) => {
        this.notify.success(response?.message);
        this.loadProducts({});
      },
      error: (error) => this.notify.error(error?.error?.message ?? 'Unknown error')
    })
  }
}
