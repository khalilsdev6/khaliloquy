import { TestBed, async, inject } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard, JwtHelperService],
      imports: [JwtModule.forRoot({
        config: {
          tokenGetter: () => {
            return '';
          }
        }
      }), RouterTestingModule]
    });
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
