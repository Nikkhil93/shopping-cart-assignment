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
    spyOn(service,'updateProduct');
    component.updateProduct('5b6c6b7001a7c38429530885', false);
    expect(service.updateProduct).toHaveBeenCalledWith('5b6c6b7001a7c38429530885', false)
  })
});
