import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThermodataComponent } from './thermodata.component';

describe('ThermodataComponent', () => {
  let component: ThermodataComponent;
  let fixture: ComponentFixture<ThermodataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThermodataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThermodataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
