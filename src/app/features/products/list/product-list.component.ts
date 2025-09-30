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
  ProductType, ProductFacade,
} from '@features/products';
import {TableConfigType} from '@core/models';
import {ProductTableActions} from './product-table-actions.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, TableModule, ConfirmPopup, TemplateTableComponent, TableCaptionComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  private facade = inject(ProductFacade);
  private actions = inject(ProductTableActions);
  sharedService = inject(SharedDataService);
  data: Signal<ProductType[]> = computed(() => this.facade.products());
  pagination: Signal<PaginatorType> = computed(() => this.facade.paginator());
  columns: ProductColumnType[] = getTableConfig(this.sharedService.data().defaultLanguage, this.sharedService.data().defaultCurrency);
  selectedProducts: WritableSignal<ProductType[]> = signal([]);
  searchInput = new FormControl('');
  tableConfig = computed<TableConfigType<ProductType, ProductColumnType>>(() =>
    buildProductTable(this.columns, this.pagination, this.data, this.selectedProducts, this.onPageChange.bind(this))
  );

  constructor() {
    this.facade.loadProducts({});
  }

  onPageChange(event: TablePageEvent): void {
    const {first, rows} = event;
    const page = Math.floor(first / rows) + 1;
    this.facade.loadProducts({page: page, limit: rows});
  }

  onDelete(event: Event, products: ProductType[]): void {
    this.actions.confirmDelete(event, products, () => this.selectedProducts.set([]));
  }

  onSearch(event: string) {
    this.facade.loadProducts({search: event});
  }

  showDetails(row: ProductType): void {
    this.actions.navigateToDetails(row);
  }
}
