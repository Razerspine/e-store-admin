export type ProductFormType = {
  uuid: string;
  name: Array<Record<string, string>>;
  description: Array<Record<string, string>>;
  category: string;
  price: Array<Record<string, number>>;
  sku: string;
  images: Array<{ url: string; publicId: string }>;
  isActive: boolean;
};
