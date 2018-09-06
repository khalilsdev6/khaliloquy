import { TestBed, async, inject } from '@angular/core/testing';

import { AutheGuard } from './auth.guard';

describe('AutheGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AutheGuard]
    });
  });

  it('should ...', inject([AutheGuard], (guard: AutheGuard) => {
    expect(guard).toBeTruthy();
  }));
});
