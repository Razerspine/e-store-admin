export type ProductType = {
  uuid: string;
  name: Record<string, string>;
  description: Record<string, string>;
  category: string;
  price: Record<string, number>;
  sku: string;
  images: Array<{ url: string; publicId: string }>;
  isActive: boolean;
}
