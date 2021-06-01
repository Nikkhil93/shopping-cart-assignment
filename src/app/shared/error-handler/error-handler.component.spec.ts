import { TestBed } from '@angular/core/testing';
import { ErrorHandlerComponent } from './error-handler.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      declarations: [
        ErrorHandlerComponent
      ],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(ErrorHandlerComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
