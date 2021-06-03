import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { BazaarDataService } from '../services/bazaar-data.service';
import { CartService } from '../services/cart.service';
import { CategoriesDataModel, ProductDataModel } from '../../shared/models/banner-data.model';
import { SpinnerDisplayService } from 'src/app/core/services/spinner-display.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  animations:[
    trigger('bringDown',[
      state('normal',style({
        opacity:1
      })),
      transition('void => *',[
        style({
          opacity: 0,
          transform: 'translateY(100px)'
        }),
        animate(300)
      ])
    ])
  ]
})
export class ProductComponent implements OnInit {

  categories: CategoriesDataModel[];
  products: ProductDataModel[];
  selectedCategoryId: string;
  filteredProducts: ProductDataModel[];
  showAll: boolean = true;
  currentState: NavigationExtras;
  selectedCategory: string = "All Items";

  constructor(
    private bazaarDataService: BazaarDataService,
    private router: Router,
    private cartService: CartService,
    private _snackbar: MatSnackBar,
    private spinnerDisplayService: SpinnerDisplayService
  ) {
    this.currentState = this.router.getCurrentNavigation()?.extras
  }


  ngOnInit(): void {
    this.bazaarDataService.getCategoriesData().subscribe((data: CategoriesDataModel[]) => {
      this.categories = data?.filter(category => category.enabled);
      this.spinnerDisplayService.showSpinner$.next(false);
    });
    this.bazaarDataService.getProductsData().subscribe((data: ProductDataModel[]) => {
      this.products = data;
      this.filterProducts(this.currentState?.state?.categoryId);
      this.spinnerDisplayService.showSpinner$.next(false);
    });
  }

  //ngDocs
  filterProducts(categoryId: string) {
    if (this.selectedCategoryId === categoryId) {
      this.filteredProducts = this.products?.slice();
    } else {
      this.selectedCategoryId = categoryId;
      this.selectedCategory = this.categories.find(category => categoryId === category.id).name;
      this.filteredProducts = this.products.filter(product => product.category === categoryId);
    }
  }

  //ngDocs
  buyNow(productId) {
    this.bazaarDataService.addToCart({ productId }).then(()=>{
      const { name, imageURL, price } = this.filteredProducts.find(product => product.id === productId);
    this.cartService.updateCart(productId, name, imageURL, price);
    this._snackbar.open("Added to Cart", "Dismiss", { duration: 3000 });
    });
  }
}
