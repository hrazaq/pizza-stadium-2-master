import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuDetailsV2Component } from './menu-details-v2.component';

describe('MenuDetailsV2Component', () => {
  let component: MenuDetailsV2Component;
  let fixture: ComponentFixture<MenuDetailsV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuDetailsV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuDetailsV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
