import {inject, Injectable} from '@angular/core';
import {ProductService, ProductType} from '@features/products';
import {BaseTableActionsService} from '@core/services';

@Injectable({providedIn: 'root'})
export class ProductTableActions extends BaseTableActionsService<ProductType> {
  private productService = inject(ProductService);

  protected getId(item: ProductType): string {
    return item.uuid;
  }

  protected getDeleteMessage(items: ProductType[]): string {
    return `Are you sure you want to delete ${items.length} product(s)?`;
  }

  protected deleteItems(ids: string[]): void {
    this.productService.deleteProducts(ids);
  }

  protected getDetailsUrl(item: ProductType): string {
    return `/products/${item.uuid}`;
  }
}
