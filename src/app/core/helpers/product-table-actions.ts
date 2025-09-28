import {inject, Injectable} from '@angular/core';
import {ConfirmationService} from 'primeng/api';
import {ProductService} from '@core/services';
import {Router} from '@angular/router';
import {ProductType} from '@core/models';

@Injectable({providedIn: 'root'})
export class ProductTableActions {
  private confirmationService = inject(ConfirmationService);
  private productService = inject(ProductService);
  private router = inject(Router);

  confirmDelete(event: Event, products: ProductType[], afterDelete: () => void) {
    const uuids = products.map(p => p.uuid);
    this.confirmationService.confirm({
      target: event.currentTarget as EventTarget,
      message: 'Are you sure you want delete this selected product/s?',
      icon: 'pi pi-info-circle',
      rejectButtonProps: {label: 'Cancel', severity: 'secondary', outlined: true},
      acceptButtonProps: {label: 'Confirm', severity: 'danger'},
      accept: () => {
        afterDelete();
        this.productService.deleteProducts(uuids);
      }
    });
  }

  navigateToDetails(row: ProductType) {
    this.router.navigate([`/products/${row.uuid}`]).then();
  }
}
