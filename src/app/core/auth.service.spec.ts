import { TestBed, inject } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService, JwtHelperService],
      imports: [JwtModule.forRoot({
        config: {
          tokenGetter: () => {
            return '';
          }
        }
      })]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});
