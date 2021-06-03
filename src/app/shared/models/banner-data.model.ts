export interface BannerImageModel{
  bannerImageUrl: string;
  bannerImageAlt:string;
  isActive: boolean;
  order: number;
  id: string;
}

export interface CategoriesDataModel {
  name: string;
  key: string;
  description: string;
  enabled: boolean;
  order: number;
  imageUrl?: string;
  id: string;
}

export interface ProductDataModel {
  name: string;
  imageURL: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  sku: string;
  id: string;
}


export interface orderDetails { 
  productId:string, 
  productName: string, 
  productUrl: number,
  originalPrice: number, 
  productPrice: number, 
  productValue: number
}