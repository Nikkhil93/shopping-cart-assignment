import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BannerImageModel, CategoriesDataModel, ProductDataModel } from '../models/banner-data.model';
import { DataService } from './data-service';

@Injectable({
  providedIn: 'root'
})

export class BazaarDataService {
  constructor(private router: Router) { }

  private handleError(error){
    DataService.errorOccured= true;
    this.router.navigate(['/error']);
  }

  getBannersData(): Promise<BannerImageModel[]> {
    return DataService.getRequest("banners").catch(this.handleError.bind(this))
  }

  getCategoriesData(): Promise<CategoriesDataModel[]> {
    return DataService.getRequest("categories").catch(this.handleError.bind(this))
  }

  getProductsData(): Promise<ProductDataModel[]> {
    return DataService.getRequest("products").catch(this.handleError.bind(this))
  }

  addToCart(productId) : Promise<any> {
    return DataService.postRequest("addToCart",productId);
  }
}
