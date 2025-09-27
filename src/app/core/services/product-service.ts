import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ProductFiltersType, ProductType} from '@core/models';
import {environment} from '../../../environments/environment';
import {PaginatorType} from '@core/models/paginator-type';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';

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
  private messageService = inject(MessageService);
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
    this.http.get<ProductResponse>(`${environment.apiBaseUrl}/api/private/products?${params.toString()}`).subscribe({
      next: response => {
        this.products.set(response?.items ?? []);
        this.paginator.set(response?.meta);
      },
      error: error => {
        console.error(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error!',
          detail: `Error: ${error?.error?.message}`,
          life: 8000
        });
      }
    });
  }

  getProductByUuid(uuid: string): Observable<ProductType> {
    return this.http.get<ProductType>(`${environment.apiBaseUrl}/api/private/products/${uuid}`);
  }

  updateProduct(uuid: string, changes: Partial<ProductType>): void {
    delete changes.uuid;
    if (!changes?.image?.url && !changes?.image?.publicId) {
      delete changes.image;
    }
    this.http.patch<ProductType>(`${environment.apiBaseUrl}/api/private/products/${uuid}`, changes)
      .subscribe({
        next: response => {
          console.log(response);
          this.getProducts({});
          this.router.navigate(['/products']).then();
        },
        error: error => {
          console.error(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error!',
            detail: `Error: ${error?.error?.message}`,
            life: 8000
          });
        }
      });
  }

  createProduct(product: ProductType | Partial<ProductType>): void {
    delete product.uuid;
    if (!product?.image?.url && !product?.image?.publicId) {
      delete product.image;
    }
    this.http.post(`${environment.apiBaseUrl}/api/private/products`, product)
      .subscribe({
        next: response => {
          console.log(response);
          this.getProducts({});
          this.router.navigate(['/products']).then();
        },
        error: error => {
          console.error(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error!',
            detail: `Error: ${error?.error?.message}`,
            life: 8000
          });
        }
      })
  }

  deleteProduct(uuid: string): void {
    this.http.delete(`${environment.apiBaseUrl}/api/private/products/${uuid}`)
      .subscribe({
        next: response => {
          console.log(response);
          this.messageService.add({
            severity: 'success',
            summary: 'Success!',
            detail: `Product UUID: ${uuid} deleted successfully!`,
            life: 3000
          });
          this.getProducts({});
        },
        error: error => {
          console.error(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error!',
            detail: `Error: ${error?.error?.message}`,
            life: 8000
          });
        }
      })
  }
}
