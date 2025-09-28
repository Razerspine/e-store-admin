import {CurrencyType, LanguageType} from '@core/models';
import {ProductColumnType} from '@features/products';

export const getTableConfig = (defaultLanguage: LanguageType, defaultCurrency: CurrencyType): ProductColumnType[] => {
  if (!defaultLanguage || !defaultCurrency) return []
  return [
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
}
