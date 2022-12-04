import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnCellRemoveComponent } from './btn-cell-remove.component';

describe('BtnCellRemoveComponent', () => {
  let component: BtnCellRemoveComponent;
  let fixture: ComponentFixture<BtnCellRemoveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnCellRemoveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnCellRemoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
