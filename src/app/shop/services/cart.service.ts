import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { orderDetails } from '../../shared/models/banner-data.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private noOfCartItems: number = 0;
  private orderDetails: orderDetails[] = [];
  private totalPrice: number = 0;
  public totalCartItems$: BehaviorSubject<number> = new BehaviorSubject(0);
  public totalPrice$: BehaviorSubject<number> = new BehaviorSubject(0);
  public cartDetails$: BehaviorSubject<orderDetails[]> = new BehaviorSubject(null);

  constructor() { }

  //Adds/increases an item present in a cart used in product component
  public updateCart(productId, productName, productUrl, originalPrice) {
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

  //returns total catrt items, used in cart and header
  public getTotalCartItems(): BehaviorSubject<number> {
    return this.totalCartItems$;
  }

  //returns cartsDetails behaviour subject
  public getCartDetails(): BehaviorSubject<orderDetails[]> {
    return this.cartDetails$;
  }

  //fetching the total price
  public getCartPrice(): BehaviorSubject<number> {
    return this.totalPrice$;
  }

  //increases or decreases the number of item in the cart
  public updateProduct(productId, increment) {
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
