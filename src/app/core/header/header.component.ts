import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { BreakpointObserver} from '@angular/cdk/layout';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CartComponent } from '../../shop/cart/cart.component'
import { CartDialogService } from '../../shop/services/cart-diaog.service';
import { CartService } from '../../shop/services/cart.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls:['./header.component.scss']
})
export class HeaderComponent implements OnInit , OnDestroy{

  public cartValue$: Subject<number>;
  private subscriptions : Subscription = new Subscription();
  private dialogRef$: MatDialogRef<CartComponent>;
  private isAboveMedium: boolean;
  private dialogConfig: MatDialogConfig = {
    width: '480px',
    disableClose: true,
    position: { right: '10%', top :'82px' }
  }

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

  //If on tablet or below screen size then redirect to 'cart' else open dialog
  public cartAction(){
    this.isAboveMedium ? this.openDialog() : this.router.navigate(['/cart']);
  }
  //Open a dialog with cartComponent inside it.
  private openDialog(){
    this.dialogConfig.data = this.isAboveMedium;
    this.dialogRef$ = this.dialog.open(CartComponent, this.dialogConfig);
  }
  ngOnDestroy(){
    this.subscriptions.unsubscribe();
  }
}
