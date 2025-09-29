import {Component, computed, inject, signal, Signal, WritableSignal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedDataService} from '@core/services';
import {TableModule, TablePageEvent} from 'primeng/table';
import {PaginatorType} from '@core/models/paginator.type';
import {ConfirmPopup} from 'primeng/confirmpopup';
import {FormControl} from '@angular/forms';
import {TableCaptionComponent, TemplateTableComponent} from '@app/shared';
import {
  buildProductTable,
  ProductColumnType,
  getTableConfig,
  ProductService,
  ProductTableActions,
  ProductType,
} from '@features/products';
import {TableConfigType} from '@core/models';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, TableModule, ConfirmPopup, TemplateTableComponent, TableCaptionComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  private productService = inject(ProductService);
  private actions = inject(ProductTableActions);
  sharedService = inject(SharedDataService);
  data: Signal<ProductType[]> = computed(() => this.productService.products());
  pagination: Signal<PaginatorType> = computed(() => this.productService.paginator());
  columns: ProductColumnType[] = getTableConfig(this.sharedService.data().defaultLanguage, this.sharedService.data().defaultCurrency);
  selectedProducts: WritableSignal<ProductType[]> = signal([]);
  searchInput = new FormControl('');
  tableConfig = computed<TableConfigType<ProductType, ProductColumnType>>(() =>
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

  onSearch(event: string) {
    this.productService.getProducts({search: event});
  }

  showDetails(row: ProductType): void {
    this.actions.navigateToDetails(row);
  }
}
