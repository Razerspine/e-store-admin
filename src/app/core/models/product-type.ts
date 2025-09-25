export type ProductType = {
  uuid: string;
  name: Record<string, string>;
  description: Record<string, string>;
  category: string;
  price: Record<string, number>;
  sku: string;
  image: { url: string ; publicId: string };
  isActive: boolean;
}
