import { TestBed } from '@angular/core/testing';

import { StudentSignupService } from './student-signup.service';

describe('StudentSignupService', () => {
  let service: StudentSignupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentSignupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
