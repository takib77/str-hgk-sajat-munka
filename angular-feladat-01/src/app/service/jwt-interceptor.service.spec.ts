import { TestBed } from '@angular/core/testing';

import { JwtinterceptorService } from './jwt-interceptor.service';

describe('JwtinterceptorService', () => {
  let service: JwtinterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JwtinterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
