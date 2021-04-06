import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupSlideComponent } from './popup-slide.component';

describe('PopupSlideComponent', () => {
  let component: PopupSlideComponent;
  let fixture: ComponentFixture<PopupSlideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupSlideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
