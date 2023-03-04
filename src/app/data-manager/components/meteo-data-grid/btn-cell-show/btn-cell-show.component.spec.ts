import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnCellShowComponent } from './btn-cell-show.component';

describe('BtnCellShowComponent', () => {
  let component: BtnCellShowComponent;
  let fixture: ComponentFixture<BtnCellShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnCellShowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnCellShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
