import {Component, computed, inject, signal, Signal, WritableSignal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductService, SharedDataService} from '@core/services';
import {ColumnType, ProductType, TableConfigType} from '@core/models';
import {TableModule, TablePageEvent} from 'primeng/table';
import {PaginatorType} from '@core/models/paginator-type';
import {ConfirmPopup} from 'primeng/confirmpopup';
import {getTableConfig, buildProductTable} from '@core/utils';
import {FormControl} from '@angular/forms';
import {TemplateTable} from '@app/shared';
import {ProductCaption} from '@pages/product-list/components';
import {ProductTableActions} from '@core/helpers';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, TableModule, ConfirmPopup, TemplateTable, ProductCaption],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss'
})
export class ProductList {
  private productService = inject(ProductService);
  private actions = inject(ProductTableActions);
  sharedService = inject(SharedDataService);
  data: Signal<ProductType[]> = computed(() => this.productService.products());
  pagination: Signal<PaginatorType> = computed(() => this.productService.paginator());
  columns: ColumnType[] = getTableConfig(this.sharedService.data().defaultLanguage, this.sharedService.data().defaultCurrency);
  selectedProducts: WritableSignal<ProductType[]> = signal([]);
  searchInput = new FormControl('');
  tableConfig = computed<TableConfigType>(() =>
    buildProductTable(this.columns, this.pagination, this.data, this.selectedProducts, this.onPageChange.bind(this))
  );

  onPageChange(event: TablePageEvent): void {
    const {first, rows} = event;
    const page = Math.floor(first / rows) + 1;
    this.productService.getProducts({page: page, limit: rows});
  }

  onDelete(event: Event, products: ProductType[]): void {
    this.actions.confirmDelete(event, products, () => this.selectedProducts.set([]));
  }

  showDetails(row: ProductType): void {
    this.actions.navigateToDetails(row);
  }
}
