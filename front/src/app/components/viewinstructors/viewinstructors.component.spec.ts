import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewinstructorsComponent } from './viewinstructors.component';

describe('ViewinstructorsComponent', () => {
  let component: ViewinstructorsComponent;
  let fixture: ComponentFixture<ViewinstructorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewinstructorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewinstructorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
