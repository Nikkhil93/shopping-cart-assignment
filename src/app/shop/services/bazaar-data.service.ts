import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../core/services/data-service';
import { SpinnerDisplayService } from '../../core/services/spinner-display.service';
import { BannerImageModel, CategoriesDataModel, ProductDataModel } from '../../shared/models/banner-data.model';

@Injectable({
  providedIn: 'root'
})

export class BazaarDataService {
  constructor( private router: Router, private spinnerDisplayService: SpinnerDisplayService) { }

  //ngDocs
  private handleError(error){
    DataService.errorOccured= true;
    this.spinnerDisplayService.showSpinner$.next(false);
    this.router.navigate(['/error']);
  }

  //ngDocs
  getBannersData(): Promise<BannerImageModel[]> {
    this.spinnerDisplayService.showSpinner$.next(true);
    return DataService.getRequest("banners").catch(this.handleError.bind(this))
  }

  //ngDocs
  getCategoriesData(): Promise<CategoriesDataModel[]> {
    this.spinnerDisplayService.showSpinner$.next(true);
    return DataService.getRequest("categories").catch(this.handleError.bind(this))
  }

  //ngDocs
  getProductsData(): Promise<ProductDataModel[]> {
    this.spinnerDisplayService.showSpinner$.next(true);
    return DataService.getRequest("products").catch(this.handleError.bind(this))
  }

  //ngDocs
  addToCart(productId) : Promise<any> {
    return DataService.postRequest("addToCart",productId);
  }
}
