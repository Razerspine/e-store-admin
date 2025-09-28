import {FormGroup} from '@angular/forms';
import {ProductFormType} from '@features/products';

export const FormatFormData = (form: FormGroup): ProductFormType => {
  const rawData = form.getRawValue();
  return {
    uuid: rawData.uuid || '',
    name: Array.isArray(rawData.name) ? rawData.name : {},
    description: Array.isArray(rawData.description) ? rawData.description : {},
    category: rawData.category || 'all',
    price: Array.isArray(rawData.price) ? rawData.price : {},
    sku: rawData.sku || '',
    image: {
      url: rawData.image?.url || '',
      publicId: rawData.image?.publicId || ''
    },
    isActive: rawData.isActive ?? true
  };
}
