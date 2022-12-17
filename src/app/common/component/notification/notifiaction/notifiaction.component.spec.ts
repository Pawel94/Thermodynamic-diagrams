import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifiactionComponent } from './notifiaction.component';

describe('NotifiactionComponent', () => {
  let component: NotifiactionComponent;
  let fixture: ComponentFixture<NotifiactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotifiactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifiactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
