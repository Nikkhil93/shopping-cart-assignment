import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { CategoriesDataModel } from 'src/app/dal/models/banner-data.model';
import { BazaarDataService } from 'src/app/dal/services/bazaar-data.service';

import { ProductComponent } from './product.component';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  let productsMock = [{
    "name": "Kiwi",
    "imageURL": "/static/images/products/fruit-n-veg/kiwi-green.jpg",
    "description": "Kiwis are oval shaped with a brownish outer skin.",
    "price": 87,
    "stock": 50,
    "category": "5b6899953d1a866534f516e2",
    "sku": "fnw-kiwi-3",
    "id": "5b6c6a7f01a7c38429530883"
  },
  {
    "name": "Apple - Washington, Regular, 4 pcs",
    "imageURL": "/static/images/products/fruit-n-veg/apple.jpg",
    "description": "The bright red coloured and heart shaped Washington apples",
    "price": 187,
    "stock": 50,
    "category": "5b6899953d1a866534f516e2",
    "sku": "fnw-apple-4",
    "id": "5b6c6aeb01a7c38429530884"
  },
  {
    "name": "Fresho Pomegrante Peeled, 500 gm ",
    "imageURL": "/static/images/products/fruit-n-veg/pomegrante.jpg",
    "description": "Pomegranate variety has a glossy.",
    "price": 88,
    "stock": 50,
    "category": "5b6899953d1a866534f516e2",
    "sku": "fnw-pomegranate-500",
    "id": "5b6c6b7001a7c38429530885"
  }];
  let categoriesMock: CategoriesDataModel[] = [
  {
    "name": "Fruits & Vegetables",
    "key": "fruit-and-veg",
    "description": "A variety of fresh fruits and vegetables.",
    "enabled": true,
    "order": 1,
    "imageUrl": "/static/images/category/fruits.png",
    "id": "5b6899953d1a866534f516e2"
  },{
    "name": "Seafood",
    "key": "seafood",
    "description": "Great place to buy fresh seafood.",
    "enabled": true,
    "order": -1,
    "id": "5b68997d3d1a866534f516e1"
  }];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatSnackBarModule,RouterTestingModule,BrowserAnimationsModule],
      declarations: [ ProductComponent ],
      providers: [BazaarDataService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch categories data successfully if called asynchronously', fakeAsync(() => {
    let fixture = TestBed.createComponent(ProductComponent);
    let app = fixture.debugElement.componentInstance;
    let dataService = fixture.debugElement.injector.get(BazaarDataService);
    let spy = spyOn(dataService, 'getCategoriesData')
      .and.returnValue(Promise.resolve(categoriesMock));
    fixture.detectChanges();
    tick();
    expect(app.categories).toEqual(categoriesMock);
  }));

  it('should fetch product data successfully if called asynchronously', fakeAsync(() => {
    let fixture = TestBed.createComponent(ProductComponent);
    let app = fixture.debugElement.componentInstance;
    let dataService = fixture.debugElement.injector.get(BazaarDataService);
    let spy = spyOn(dataService, 'getProductsData')
      .and.returnValue(Promise.resolve(productsMock));
    fixture.detectChanges();
    tick();
    expect(app.products).toEqual(productsMock);
  }));

  it('should call bazaarDataService',()=>{
    let service = TestBed.inject(BazaarDataService);
    component.filteredProducts = productsMock;
    spyOn(service, 'addToCart');
    component.buyNow('5b6c6a7f01a7c38429530883');
    expect(service.addToCart).toHaveBeenCalledWith({productId:'5b6c6a7f01a7c38429530883'});

  });
  it('should update selectedCategory and filtered projects from filterProducts', () => {
    component.products = productsMock;
    component.categories = categoriesMock;
    component.filterProducts('5b6899953d1a866534f516e2');
    expect(component.selectedCategory).not.toBe('All Items');
  });
  it('should not update selectedCategory from filteredItems', () => {
    component.products = productsMock;
    component.categories = categoriesMock;
    component.selectedCategoryId = '5b6899953d1a866534f516e2';
    component.filterProducts('5b6899953d1a866534f516e2');
    expect(component.selectedCategory).toBe('All Items');
  })
});
