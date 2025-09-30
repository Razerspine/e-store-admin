import {arrayToObject, objectToArray} from '@core/utils';
import {ProductFormType, ProductType} from '@features/products';

export const productMapper = (data: ProductType | ProductFormType, toForm: boolean = false): ProductType | ProductFormType => {
  return {
    name: toForm ? objectToArray((data as ProductType).name) : arrayToObject((data as ProductFormType).name),
    description: toForm ? objectToArray((data as ProductType).description) : arrayToObject((data as ProductFormType).description),
    category: data.category,
    price: toForm ? objectToArray((data as ProductType).price) : arrayToObject((data as ProductFormType).price),
    sku: data.sku,
    image: data.image?.url && data.image?.publicId ? data.image : null,
    isActive: data.isActive,
  } as ProductType | ProductFormType;
}
