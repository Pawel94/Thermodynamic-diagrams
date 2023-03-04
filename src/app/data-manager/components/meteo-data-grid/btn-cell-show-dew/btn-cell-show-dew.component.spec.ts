import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnCellShowDewComponent } from './btn-cell-show-dew.component';

describe('BtnCellShowDewComponent', () => {
  let component: BtnCellShowDewComponent;
  let fixture: ComponentFixture<BtnCellShowDewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnCellShowDewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnCellShowDewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
