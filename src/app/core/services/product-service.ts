import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ProductFiltersType, ProductType} from '@core/models';
import {environment} from '../../../environments/environment';
import {PaginatorType} from '@core/models/paginator-type';
import {Observable} from 'rxjs';

type ProductResponse = {
  items: ProductType[];
  meta: PaginatorType
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
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
}
