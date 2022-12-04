import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationSearchModelComponent } from './station-search-model.component';

describe('StationSearchModelComponent', () => {
  let component: StationSearchModelComponent;
  let fixture: ComponentFixture<StationSearchModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StationSearchModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StationSearchModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
