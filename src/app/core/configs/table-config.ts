import {ColumnType} from '@core/models';
import {getCurrencySymbol} from '@core/utils';

export const TABLE_CONFIG: ColumnType[] = [
  {
    name: 'Uuid',
    field: 'uuid',
    value: (value) => value?.uuid ?? ''
  },
  {
    name: 'Name',
    field: 'name',
    value: (value) => value?.name['en'] ?? ''
  },
  {
    name: 'Description',
    field: 'description',
    value: (value) => value?.description['en'] ?? ''
  },
  {
    name: 'Category',
    field: 'category',
    value: (value) => value?.category ?? ''
  },
  {
    name: 'Price',
    field: 'price',
    value: (value) => {
      const symbol = getCurrencySymbol('USD');
      if (value?.price['USD']) {
        return `${value?.price['USD']} ${symbol}`;
      } else {
        return ''
      }
    }
  },
];
