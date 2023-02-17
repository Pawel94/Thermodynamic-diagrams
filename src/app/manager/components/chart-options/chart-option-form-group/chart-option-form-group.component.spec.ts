import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartOptionFormGroupComponent } from './chart-option-form-group.component';

describe('ChartOptionFormGroupComponent', () => {
  let component: ChartOptionFormGroupComponent;
  let fixture: ComponentFixture<ChartOptionFormGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartOptionFormGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartOptionFormGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
