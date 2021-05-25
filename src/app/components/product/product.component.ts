import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { BazaarDataService } from '../../dal/services/bazaar-data.service';
import { CartService } from '../../dal/services/cart.service';
import { CategoriesDataModel, ProductDataModel } from '../../dal/models/banner-data.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
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
    private _snackbar: MatSnackBar
  ) {
    this.currentState = this.router.getCurrentNavigation()?.extras
  }


  ngOnInit(): void {
    this.bazaarDataService.getCategoriesData().then((data: any[]) => this.categories = data?.filter(category => category.enabled));
    this.bazaarDataService.getProductsData().then(data => {
      this.products = data;
      this.filterProducts(this.currentState?.state?.categoryId);
    });
  }

  filterProducts(categoryId: string) {
    if (this.selectedCategoryId === categoryId) {
      this.filteredProducts = this.products?.slice();
    } else {
      this.selectedCategoryId = categoryId;
      this.selectedCategory = this.categories.filter(category => categoryId === category.id)[0].name;
      this.filteredProducts = this.products.filter(product => product.category === categoryId);
    }
  }

  buyNow(productId) {
    this.bazaarDataService.addToCart({ productId });
    const { name, imageURL, price } = this.filteredProducts.find(product => product.id === productId);
    this.cartService.updateCart(productId, name, imageURL, price);
    this._snackbar.open("Added to Cart", "Dismiss", { duration: 1500 });

  }
}
