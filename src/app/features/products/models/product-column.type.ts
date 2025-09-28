import {ProductType} from '@features/products/models/product.type';

export type ProductColumnType = {
  name: string,
  field: string,
  value: (value: Pick<ProductType, 'uuid' | 'name'  | 'category' | 'price'>) => string,
}
