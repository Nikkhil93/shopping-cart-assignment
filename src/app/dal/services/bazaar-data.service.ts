import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BannerImageModel, CategoriesDataModel, ProductDataModel } from '../models/banner-data.model';
import { DataService } from './data-service';

@Injectable({
  providedIn: 'root'
})

export class BazaarDataService {
  banners: BannerImageModel[] = [];
  categories: CategoriesDataModel[] = [];
  products: ProductDataModel[] = [];

  constructor(private router: Router) { }

  getBannersData(): Promise<BannerImageModel[]> {
    return (this.banners.length === 0) ? 
      DataService.getRequest("banners").catch((err)=>{
        DataService.errorOccured= true;
        this.router.navigate(['/error']);
      }): 
      Promise.resolve(this.banners);
  }

  getCategoriesData(): Promise<CategoriesDataModel[]> {
    return this.categories.length === 0 ?
      DataService.getRequest("categories").catch((err)=>{
        this.router.navigate(['/error']);
      }): 
      Promise.resolve(this.categories);
  }

  getProductsData(): Promise<ProductDataModel[]> {
    return (this.products.length === 0) ?
      DataService.getRequest("products").catch((err)=>{
        this.router.navigate(['/error']);
      }): 
      Promise.resolve(this.products);
  }


  addToCart(productId) : Promise<any> {
    return DataService.postRequest("addToCart",productId);
  }
}
