import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifictaionsComponent } from './notifictaions.component';

describe('NotifictaionsComponent', () => {
  let component: NotifictaionsComponent;
  let fixture: ComponentFixture<NotifictaionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotifictaionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifictaionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
