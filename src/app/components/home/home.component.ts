import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { BannerImageModel, CategoriesDataModel } from '../../dal/models/banner-data.model';
import { BazaarDataService } from '../../dal/services/bazaar-data.service';

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

  banners: BannerImageModel[];
  categories: CategoriesDataModel[];
  animateCenter: string = "normal"; 
  animateStart:string = "normal";

  constructor(
    private bazaarDataService: BazaarDataService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.bazaarDataService.getBannersData().then((data)=>{
      this.banners = data;
    });
    this.bazaarDataService.getCategoriesData().then((data)=>{
      this.categories = data?.filter(category => category.enabled);
    });
  }

  exploreCategory(categoryId) {
    const categoryDetails: NavigationExtras = {
      state: {
        categoryId
      }
    };
    this.route.navigate(['product'], categoryDetails)
  }
}
