import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeproductsComponent } from './homeproducts.component';

describe('HomeproductsComponent', () => {
  let component: HomeproductsComponent;
  let fixture: ComponentFixture<HomeproductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeproductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
