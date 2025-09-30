import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {Observable} from 'rxjs';
import {ProductType} from '@features/products';
import {PaginatorType} from '@core/models';

type ProductResponse = {
  items: ProductType[];
  meta: PaginatorType
}

@Injectable({
  providedIn: 'root'
})
export class ProductApiService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiBaseUrl}/api/private/products`;

  getProducts(params: HttpParams): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(this.baseUrl, {params});
  }

  getProduct(uuid: string): Observable<ProductType> {
    return this.http.get<ProductType>(`${this.baseUrl}/${uuid}`);
  }

  createProduct(product: Partial<ProductType>): Observable<ProductType> {
    return this.http.post<ProductType>(this.baseUrl, product);
  }

  updateProduct(uuid: string, changes: Partial<ProductType>): Observable<ProductType> {
    return this.http.patch<ProductType>(`${this.baseUrl}/${uuid}`, changes);
  }

  deleteProduct(uuid: string[]): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(this.baseUrl, {body: uuid});
  }
}
