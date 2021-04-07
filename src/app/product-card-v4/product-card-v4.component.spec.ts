import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCardV4Component } from './product-card-v4.component';

describe('ProductCardV4Component', () => {
  let component: ProductCardV4Component;
  let fixture: ComponentFixture<ProductCardV4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductCardV4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCardV4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
