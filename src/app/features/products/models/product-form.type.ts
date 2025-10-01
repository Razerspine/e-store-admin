export type ProductFormType = {
  name: Array<Record<string, string>>;
  description: Array<Record<string, string>>;
  category: string;
  price: Array<Record<string, number>>;
  sku: string;
  image?: { url: string; publicId: string } | null;
  isActive: boolean;
};
