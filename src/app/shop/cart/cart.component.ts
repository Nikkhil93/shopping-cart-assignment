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

  totalCartItems: number;
  cartProducts$: BehaviorSubject<orderDetails[]>;
  cartPrice$: BehaviorSubject<number>;
  private subscriptions: Subscription;

  constructor(
    private cartService: CartService,
    private router: Router,
    private cartDialog: CartDialogService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data?: any
    ) { }

  ngOnInit(): void {
    this.subscriptions = this.cartService.getTotalCartItems()
      .subscribe(value => this.totalCartItems = value);
    this.cartProducts$ = this.cartService.getCartDetails();
    this.cartPrice$ = this.cartService.getCartPrice();
  }

  //ngDocs
  updateProduct(productId, increment) {
    this.cartService.updateProduct(productId, increment);
  }
  //ngDocs
  navigateIfEmpty(){
    if(this.totalCartItems === 0){
      this.router.navigate(['/product']);
      this.data?this.closeDialog():'';
    }
  }
  //ngDocs
  closeDialog(){
    this.cartDialog.closeClicked.next(true);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}


