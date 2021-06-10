import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { SpinnerDisplayService } from 'src/app/core/services/spinner-display.service';
import { BannerImageModel, CategoriesDataModel } from '../../shared/models/banner-data.model';
import { BazaarDataService } from '../services/bazaar-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations:[
    trigger('startItems',[
      state('normal',style({
        opacity:1
      })),
      transition('void => *',[
        style({
          opacity: 0,
          transform: 'translateX(-100px)'
        }),
        animate(500)
      ])
    ]),
    trigger('centerItems',[
      state('normal',style({
        opacity:1
      })),
      transition('void => *',[
        style({
          opacity: 0,
          transform: 'translateX(100px)'
        }),
        animate(500)
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {

  public banners: BannerImageModel[];
  public categories: CategoriesDataModel[];

  constructor(
    private bazaarDataService: BazaarDataService,
    private route: Router,
    private spinnerDisplayService: SpinnerDisplayService
  ) { }

  ngOnInit(): void {
    this.bazaarDataService.getBannersData().subscribe((data)=>{
      this.banners = data;
      this.spinnerDisplayService.showSpinner$.next(false);
    });
    this.bazaarDataService.getCategoriesData().subscribe((data)=>{
      this.categories = data?.filter(category => category.enabled);
      this.spinnerDisplayService.showSpinner$.next(false);
    });
  }

  //Navigates to 'product' with clicked categroy in focus
  exploreCategory(categoryId) {
    const categoryDetails: NavigationExtras = {
      state: {
        categoryId
      }
    };
    this.route.navigate(['product'], categoryDetails)
  }
}
