import {ProductType} from '@features/products/models/product.type';
import {BaseColumnType} from '@core/models/base-column.type';

export type ProductColumnType = BaseColumnType<
  Pick<ProductType, 'uuid' | 'name' | 'category' | 'price'>
>
