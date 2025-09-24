import {ProductFormType, ProductType} from '@core/models';
import {arrayToObject, objectToArray} from '@core/utils';

export const productMapper = (data: ProductType | ProductFormType, toForm: boolean = false): ProductType | ProductFormType => {
  return {
    uuid: data.uuid,
    name: toForm ? objectToArray((data as ProductType).name) : arrayToObject((data as ProductFormType).name),
    description: toForm ? objectToArray((data as ProductType).description) : arrayToObject((data as ProductFormType).description),
    category: data.category,
    price: toForm ? objectToArray((data as ProductType).price) : arrayToObject((data as ProductFormType).price),
    sku: data.sku,
    images: data.images,
    isActive: data.isActive,
  } as ProductType | ProductFormType;
}
