import {arrayToObject, objectToArray} from '@core/utils';
import {ProductFormType, ProductType} from '@features/products';

export const toForm = (data: ProductType): ProductFormType => {
  return {
    name: objectToArray(data.name),
    description: objectToArray(data.description),
    category: data.category,
    price: objectToArray(data.price),
    sku: data.sku,
    image: data.image,
    isActive: data.isActive,
  }
};

export const fromForm = (data: ProductFormType): Partial<ProductType> => {
  return {
    name: arrayToObject(data.name),
    description: arrayToObject(data.description),
    category: data.category,
    price: arrayToObject(data.price),
    sku: data.sku,
    image: normalizeImage(data.image),
    isActive: data.isActive,
  }
};


const normalizeImage = (img: { url: string; publicId: string } | null | undefined) => {
  if (img && img.url?.length > 0) {
    return img;
  } else {
    return null;
  }
};

