import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { BreakpointObserver} from '@angular/cdk/layout';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { CartService } from '../../dal/services/cart.service';
import { CartComponent } from '../cart/cart.component'
import { CartDialogService } from '../../dal/services/cart-diaog.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls:['./header.component.scss']
})
export class HeaderComponent implements OnInit , OnDestroy{
  private subscriptions : Subscription = new Subscription();
  private dialogRef$: MatDialogRef<CartComponent>;
  private isAboveMedium: boolean;
  private dialogConfig: MatDialogConfig = {
    width: '480px',
    disableClose: true,
    position: { right: '10%', top :'82px' }
  }
  cartValue$: Subject<number>;

  constructor(
    private cartService: CartService,
    private breakPointObserver: BreakpointObserver,
    private dialog: MatDialog,
    private router: Router,
    private cartDialog: CartDialogService
  ) { 
    this.subscriptions.add(this.breakPointObserver.observe('(min-width: 992px)').subscribe((state)=>{
      this.isAboveMedium = state.matches;
    }));
  }

  ngOnInit(): void {
    this.cartValue$ = this.cartService.getTotalCartItems();
    this.subscriptions.add(this.cartDialog.closeClicked.subscribe(()=>{
      this.dialogRef$.close();
      })
    );
  }

  public cartAction(){
    this.isAboveMedium ? this.openDialog() : this.router.navigate(['/cart']);
  }
  private openDialog(){
    this.dialogConfig.data = this.isAboveMedium;
    this.dialogRef$ = this.dialog.open(CartComponent, this.dialogConfig);
  }
  ngOnDestroy(){
    this.subscriptions.unsubscribe();
  }

}
