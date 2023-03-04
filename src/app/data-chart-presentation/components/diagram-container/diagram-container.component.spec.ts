import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagramContainerComponent } from './diagram-container.component';

describe('DiagramContainerComponent', () => {
  let component: DiagramContainerComponent;
  let fixture: ComponentFixture<DiagramContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagramContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagramContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
