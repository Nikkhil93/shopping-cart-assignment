import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CartService } from '../services/cart.service';

import { CartComponent } from './cart.component';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ CartComponent ],
      providers:[CartService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call cartservice.updateProduct from updateProduct',()=>{
    let service = TestBed.inject(CartService);
    //@ts-ignore
    service.orderDetails = [{originalPrice: 165,
      productId: "5b6c6b7001a7c38429530885",
      productName: "Fresho Pomegrante Peeled, 500 gm",
      productPrice: 88,
      productUrl: "/static/images/products/fruit-n-veg/pomegrante.jpg",
      productValue: 1}];
    spyOn(service,'updateProduct').withArgs('5b6c6b7001a7c38429530885', false).and.callThrough();
    component.updateProduct('5b6c6b7001a7c38429530885', false);
    expect(service.updateProduct).toHaveBeenCalledWith('5b6c6b7001a7c38429530885', false)
  });

  it('should call cartservice.updateProduct from updateProduct with true',()=>{
    let service = TestBed.inject(CartService);
    //@ts-ignore
    service.orderDetails = [{originalPrice: 165,
      productId: "5b6c6b7001a7c38429530885",
      productName: "Fresho Pomegrante Peeled, 500 gm",
      productPrice: 88,
      productUrl: "/static/images/products/fruit-n-veg/pomegrante.jpg",
      productValue: 1}];
    spyOn(service,'updateProduct').withArgs('5b6c6b7001a7c38429530885', true).and.callThrough();
    component.updateProduct('5b6c6b7001a7c38429530885', true);
    expect(service.updateProduct).toHaveBeenCalledWith('5b6c6b7001a7c38429530885', true)
  });

  it('should navigate if Empty',()=>{
    //@ts-ignore
    spyOn(component.router,'navigate');
    component.totalCartItems = 0;
    component.data = true;
    component.navigateIfEmpty();
    //@ts-ignore
    expect(component.router.navigate).toHaveBeenCalled()
  });
  it('should not navigate if not Empty',()=>{
    //@ts-ignore
    spyOn(component.router,'navigate');
    component.totalCartItems = 1;
    component.data = true;
    component.navigateIfEmpty();
    //@ts-ignore
    expect(component.router.navigate).not.toHaveBeenCalled()
  });
});
