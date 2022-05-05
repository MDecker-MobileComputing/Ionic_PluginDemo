import { TestBed } from '@angular/core/testing';

import { ToastHelferService } from './toast-helfer.service';

describe('ToastHelferService', () => {
  let service: ToastHelferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastHelferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
