import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagramSkewTComponent } from './diagram-skew-t.component';

describe('DiagramSkewTComponent', () => {
  let component: DiagramSkewTComponent;
  let fixture: ComponentFixture<DiagramSkewTComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagramSkewTComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagramSkewTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
