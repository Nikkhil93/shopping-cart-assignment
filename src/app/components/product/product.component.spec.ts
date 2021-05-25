import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { BazaarDataService } from 'src/app/dal/services/bazaar-data.service';

import { ProductComponent } from './product.component';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

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
  it('should call bazaarDataService',()=>{
    let service = TestBed.inject(BazaarDataService);
    component.filteredProducts = [{
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
    }]
    spyOn(service, 'addToCart');
    component.buyNow('5b6c6a7f01a7c38429530883');
    expect(service.addToCart).toHaveBeenCalledWith({productId:'5b6c6a7f01a7c38429530883'});

  })
});
