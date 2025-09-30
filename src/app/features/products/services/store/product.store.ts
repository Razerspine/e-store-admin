import {inject, Injectable, signal} from '@angular/core';
import {ProductApiService, ProductFiltersType, ProductType} from '@features/products';
import {PaginatorType} from '@core/models';
import {Observable, tap} from 'rxjs';
import {HttpParams} from '@angular/common/http';

type ProductResponse = {
  items: ProductType[];
  meta: PaginatorType
}

@Injectable({
  providedIn: 'root'
})
export class ProductStore {
  private api = inject(ProductApiService);
  products = signal<ProductType[]>([]);
  paginator = signal<PaginatorType>({
    limit: 20,
    page: 1,
    pages: 0,
    total: 0,
  });

  loadProducts(
    {
      search,
      active = true,
      page = 1,
      limit = 20
    }: Partial<ProductFiltersType> = {}
  ): Observable<ProductResponse> {
    const params = new HttpParams()
      .set('search', search ?? '')
      .set('active', active ?? true)
      .set('page', page)
      .set('limit', limit);
    return this.api.getProducts(params)
      .pipe(
        tap((response) => {
          this.products.set(response?.items ?? []);
          this.paginator.set(response?.meta);
        })
      )
  }
}
