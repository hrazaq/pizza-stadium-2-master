import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCardV3Component } from './product-card-v3.component';

describe('ProductCardV3Component', () => {
  let component: ProductCardV3Component;
  let fixture: ComponentFixture<ProductCardV3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductCardV3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCardV3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
