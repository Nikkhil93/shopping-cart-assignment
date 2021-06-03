import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { orderDetails } from '../../shared/models/banner-data.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  noOfCartItems: number = 0;
  orderDetails: orderDetails[] = [];
  totalPrice: number = 0;
  totalCartItems$: BehaviorSubject<number> = new BehaviorSubject(0);
  totalPrice$: BehaviorSubject<number> = new BehaviorSubject(0);
  cartDetails$: BehaviorSubject<orderDetails[]> = new BehaviorSubject(null);

  constructor() { }

  //ngDocs
  updateCart(productId, productName, productUrl, originalPrice) {
    this.noOfCartItems += 1;
    this.totalPrice += originalPrice;

    const product = this.orderDetails.find(product => product.productId === productId);
    if (product) {
      product.productValue += 1;
      product.productPrice = +originalPrice * product.productValue;
    } else {
      this.orderDetails.push({ productId, productName, productUrl,originalPrice, productPrice: originalPrice, productValue: 1 });
    }
    this.totalCartItems$.next(this.noOfCartItems);
    this.totalPrice$.next(this.totalPrice);
    this.cartDetails$.next(this.orderDetails);
  }

  //ngDocs
  getTotalCartItems() {
    return this.totalCartItems$;
  }

  //ngDocs
  getCartDetails() {
    return this.cartDetails$;
  }

  //ngDocs
  getCartPrice() {
    return this.totalPrice$;
  }

  //ngDocs
  updateProduct(productId, increment) {
    const product = this.orderDetails.find(product => product.productId === productId);
    if (increment) {
      product.productValue += 1;
      this.noOfCartItems+=1;
      product.productPrice = +product.originalPrice * product.productValue;
      this.totalPrice+= +product.originalPrice
    } else {
      product.productValue -= 1;
      this.noOfCartItems -= 1;
      product.productPrice = +product.originalPrice * product.productValue;
      this.totalPrice-= product.originalPrice;
      if (product.productValue === 0) {
        this.orderDetails = this.orderDetails.filter(product => product.productId !== productId);
      }
    }
    this.totalCartItems$.next(this.noOfCartItems);
    this.totalPrice$.next(this.totalPrice);
    this.cartDetails$.next(this.orderDetails);
  }
}
