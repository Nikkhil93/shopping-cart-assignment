import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { orderDetails } from '../../shared/models/banner-data.model';
import { CartDialogService } from '../services/cart-diaog.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public totalCartItems: number;
  public cartProducts$: BehaviorSubject<orderDetails[]>;
  public cartPrice$: BehaviorSubject<number>;
  private subscriptions: Subscription;

  constructor(
    private cartService: CartService,
    private router: Router,
    private cartDialog: CartDialogService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data?: boolean
    ) { }

  ngOnInit(): void {
    this.subscriptions = this.cartService.getTotalCartItems()
      .subscribe(value => this.totalCartItems = value);
    this.cartProducts$ = this.cartService.getCartDetails();
    this.cartPrice$ = this.cartService.getCartPrice();
  }

  //To add or decrease any product in cart
  public updateProduct(productId, increment) {
    this.cartService.updateProduct(productId, increment);
  }
  //Navigates to "product" if clicked on continue shopping button and cart is empty
  public navigateIfEmpty(){
    if(this.totalCartItems === 0){
      this.router.navigate(['/product']);
      this.data?this.closeDialog():'';
    }
  }
  //closes the dialog
  public closeDialog(){
    this.cartDialog.closeClicked.next(true);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}


