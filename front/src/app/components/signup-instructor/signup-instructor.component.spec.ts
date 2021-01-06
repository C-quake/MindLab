import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupInstructorComponent } from './signup-instructor.component';

describe('SignupInstructorComponent', () => {
  let component: SignupInstructorComponent;
  let fixture: ComponentFixture<SignupInstructorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupInstructorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
