import {Component, computed, inject, Signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductService, SharedDataService} from '@core/services';
import {ColumnType, ProductType} from '@core/models';
import {TableModule, TablePageEvent} from 'primeng/table';
import {PaginatorType} from '@core/models/paginator-type';
import {Button} from 'primeng/button';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {InputText} from 'primeng/inputtext';
import {ConfirmationService} from 'primeng/api';
import {ConfirmPopup} from 'primeng/confirmpopup';
import {Router} from '@angular/router';
import {getTableConfig} from '@core/utils';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {debounceTime, distinctUntilChanged} from 'rxjs';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, TableModule, Button, IconField, InputIcon, InputText, ConfirmPopup, FormsModule, ReactiveFormsModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss'
})
export class ProductList {
  private confirmationService = inject(ConfirmationService);
  private productService = inject(ProductService);
  private router = inject(Router);
  sharedService = inject(SharedDataService);
  data: Signal<ProductType[]> = computed(() => this.productService.products());
  pagination: Signal<PaginatorType> = computed(() => this.productService.paginator());
  columns: ColumnType[] = getTableConfig(this.sharedService.data().defaultLanguage, this.sharedService.data().defaultCurrency);
  selectedProducts: ProductType[] = [];
  searchInput = new FormControl('');

  constructor() {
    this.searchInput.valueChanges
      .pipe(
        debounceTime(700),
        distinctUntilChanged()
      )
      .subscribe({
        next: value => {
          if (value) {
            this.productService.getProducts({search: value});
          } else {
            this.productService.getProducts({});
          }
        }
      })
  }

  onPageChange(event: TablePageEvent) {
    const {first, rows} = event;
    const page = Math.floor(first / rows) + 1;
    this.productService.getProducts({page: page, limit: rows});
  }

  onDelete(event: Event, rowData: ProductType): void {
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
        this.productService.deleteProduct(rowData.uuid);
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
