import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmdModesComponent } from './cmd-modes.component';

describe('CmdModesComponent', () => {
  let component: CmdModesComponent;
  let fixture: ComponentFixture<CmdModesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmdModesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmdModesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
