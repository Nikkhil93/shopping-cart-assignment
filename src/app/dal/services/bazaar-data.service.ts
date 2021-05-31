import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BannerImageModel, CategoriesDataModel, ProductDataModel } from '../models/banner-data.model';
import { DataService } from './data-service';
import { SpinnerDisplayService } from './spinner-display.service';

@Injectable({
  providedIn: 'root'
})

export class BazaarDataService {
  constructor( private router: Router, private spinnerDisplayService: SpinnerDisplayService) { }

  private handleError(error){
    DataService.errorOccured= true;
    this.spinnerDisplayService.showSpinner$.next(false);
    this.router.navigate(['/error']);
  }

  getBannersData(): Promise<BannerImageModel[]> {
    this.spinnerDisplayService.showSpinner$.next(true);
    return DataService.getRequest("banners").catch(this.handleError.bind(this))
  }

  getCategoriesData(): Promise<CategoriesDataModel[]> {
    this.spinnerDisplayService.showSpinner$.next(true);
    return DataService.getRequest("categories").catch(this.handleError.bind(this))
  }

  getProductsData(): Promise<ProductDataModel[]> {
    this.spinnerDisplayService.showSpinner$.next(true);
    return DataService.getRequest("products").catch(this.handleError.bind(this))
  }

  addToCart(productId) : Promise<any> {
    return DataService.postRequest("addToCart",productId);
  }
}
