import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ProductFiltersType, ProductType} from '@core/models';
import {environment} from '../../../environments/environment';
import {PaginatorType} from '@core/models/paginator-type';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

type ProductResponse = {
  items: ProductType[];
  meta: PaginatorType
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  private router = inject(Router);
  products: WritableSignal<ProductType[]> = signal([]);
  paginator: WritableSignal<PaginatorType> = signal({
    limit: 20,
    page: 1,
    pages: 0,
    total: 0
  })

  constructor() {
    this.getProducts({});
  }

  getProducts({search, active = true, page = 1, limit = 20}: ProductFiltersType | Partial<ProductFiltersType>): void {
    let params = new HttpParams()
      .set('search', search ?? '')
      .set('active', active ?? true)
      .set('page', page ?? 1)
      .set('limit', limit ?? 20);
    this.http.get<ProductResponse>(`${environment.apiBaseUrl}/api/public/products?${params.toString()}`).subscribe({
      next: response => {
        this.products.set(response?.items ?? []);
        this.paginator.set(response?.meta);
      },
      error: error => {
        console.error(error);
      }
    });
  }

  getProductByUuid(uuid: string): Observable<ProductType> {
    return this.http.get<ProductType>(`${environment.apiBaseUrl}/api/public/products/${uuid}`);
  }

  updateProduct(uuid: string, changes: Partial<ProductType>): void {
    this.http.patch<ProductType>(`${environment.apiBaseUrl}/api/private/products/${uuid}`, changes)
      .subscribe({
        next: response => {
          console.log(response);
          this.getProducts({});
          this.router.navigate(['/products']).then();
        }
      });
  }

  createProduct(product: ProductType): void {
    this.http.post(`${environment.apiBaseUrl}/api/private/products`, product)
      .subscribe({
        next: response => {
          console.log(response);
          this.getProducts({});
          this.router.navigate(['/products']).then();
        },
        error: error => {
          console.error(error);
        }
      })
  }

  deleteProduct(uuid: string): void {
    this.http.delete(`${environment.apiBaseUrl}/api/private/products/${uuid}`)
      .subscribe({
        next: response => {
          console.log(response);
          this.getProducts({});
          this.router.navigate(['products']).then();
        },
        error: error => {
          console.error(error);
        }
      })
  }
}
