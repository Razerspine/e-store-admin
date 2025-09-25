import {Component, computed, inject, Signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductService} from '@core/services';
import {ColumnType, ProductType} from '@core/models';
import {TableModule, TablePageEvent} from 'primeng/table';
import {TABLE_CONFIG} from '@core/configs';
import {PaginatorType} from '@core/models/paginator-type';
import {Button} from 'primeng/button';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {InputText} from 'primeng/inputtext';
import {ConfirmationService, MessageService} from 'primeng/api';
import {ConfirmPopup} from 'primeng/confirmpopup';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, TableModule, Button, IconField, InputIcon, InputText, ConfirmPopup],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss'
})
export class ProductList {
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);
  private productService = inject(ProductService);
  private router = inject(Router);
  data: Signal<ProductType[]> = computed(() => this.productService.products());
  pagination: Signal<PaginatorType> = computed(() => this.productService.paginator());
  columns: ColumnType[] = TABLE_CONFIG;
  selectedProducts: ProductType[] = [];

  onPageChange(event: TablePageEvent) {
    const {first, rows} = event;
    const page = Math.floor(first / rows) + 1;
    this.productService.getProducts({page: page, limit: rows});
  }

  onSearch(event: Event): void {
    const inputSearch = event.target as HTMLInputElement;
    this.productService.getProducts({search: inputSearch?.value});
  }

  onInput(event: Event): void {
    const inputSearch = event.target as HTMLInputElement;
    if (inputSearch.value === '') {
      this.productService.getProducts({});
    }
  }

  onDelete(event: Event): void {
    this.confirmationService.confirm({
      target: event.currentTarget as EventTarget,
      message: 'Are you sure you want delete this product?',
      icon: 'pi pi-info-circle',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true
      },
      acceptButtonProps: {
        label: 'Confirm',
        severity: 'danger',
      },
      accept: () => {
        this.messageService.add({severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000});
      }
    });
  }

  showDetails(row: ProductType) {
    this.router.navigate([`/products/${row.uuid}`]).then();
  }

  changeRoute(): void {
    this.router.navigate([`/products/new`]).then();
  }
}
