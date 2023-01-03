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

  //Http request to fetch banners data
  public getBannersData(): Observable<BannerImageModel[]> {
    return this.http.get<BannerImageModel[]>(`${this.url}banners`);
  }

  //Http request to fetch categories data
  public getCategoriesData(): Observable<CategoriesDataModel[]> {
    return this.http.get<CategoriesDataModel[]>(`${this.url}categories`);
  }

  //Http request to fetch all the products
  public getProductsData(): Observable<ProductDataModel[]> {
    return this.http.get<ProductDataModel[]>(`${this.url}products`);
  }

  //Canned server throws CORS issue, hence using promise to make post request
  public addToCart(productId) : Promise<any> {
    return DataService.postRequest("addToCart",productId);
  }
}
