import {ProductType} from '@core/models/product-type';

export type ColumnType = {
  name: string,
  field: string,
  value: (value: Pick<ProductType, 'uuid' | 'name' | 'description' | 'category' | 'price'>) => string,
}
