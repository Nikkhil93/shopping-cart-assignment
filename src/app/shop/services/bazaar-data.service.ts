import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/core/services/data-service';
import { environment } from 'src/environments/environment';
import { BannerImageModel, CategoriesDataModel, ProductDataModel } from '../../shared/models/banner-data.model';

@Injectable({
  providedIn: 'root'
})

export class BazaarDataService {
  private url: string = environment.apiUrl;
  constructor( private http: HttpClient ) { }

  //ngDocs
  getBannersData(): Observable<BannerImageModel[]> {
    return this.http.get<BannerImageModel[]>(`${this.url}banners`);
  }

  //ngDocs
  getCategoriesData(): Observable<CategoriesDataModel[]> {
    return this.http.get<CategoriesDataModel[]>(`${this.url}categories`);
  }
  
  //ngDocs
  getProductsData(): Observable<ProductDataModel[]> {
    return this.http.get<ProductDataModel[]>(`${this.url}products`);
  }

  //ngDocs
  //HttpClient throws CORS issue hence sticking to this
  addToCart(productId) : Promise<any> {
    return DataService.postRequest("addToCart",productId);
  }
}
