import {ColumnType} from '@core/models';
import {LANGUAGES_CONFIG} from '@core/configs/languages-config';
import {CURRENCY_CONFIG} from '@core/configs/currency-config';

const defaultLanguage = LANGUAGES_CONFIG.filter(l => l.isDefault)[0];
const defaultCurrency = CURRENCY_CONFIG.filter(c => c.isDefault)[0];

export const TABLE_CONFIG: ColumnType[] = [
  {
    name: 'Uuid',
    field: 'uuid',
    value: (value) => value?.uuid ?? ''
  },
  {
    name: 'Name',
    field: 'name',
    value: (value) => value?.name[defaultLanguage.key] ?? ''
  },
  {
    name: 'Description',
    field: 'description',
    value: (value) => value?.description[defaultLanguage.key] ?? ''
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
      if (value?.price[defaultCurrency.key]) {
        return `${value?.price[defaultCurrency.key]} ${defaultCurrency.symbol}`;
      } else {
        return ''
      }
    }
  },
];
