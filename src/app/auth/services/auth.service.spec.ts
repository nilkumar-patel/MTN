import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, getTestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ 
        imports: [HttpClientTestingModule],
        providers: [HttpClient, AuthService] });
    injector = getTestBed();
    service = injector.get(AuthService);
    httpMock = injector.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an Login', () => {
    const dummyUsers = 
      { email: 'John', id: '123' }
    ;

    service.login('email', 'password').subscribe(users => {
      expect(users).toEqual(dummyUsers);
    });

    const req = httpMock.expectOne(`https://reqres.in/api/login`);
    expect(req.request.method).toBe("POST");
    req.flush(dummyUsers);
  });
});
