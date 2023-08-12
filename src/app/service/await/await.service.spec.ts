import { TestBed } from '@angular/core/testing';

import { AwaitService } from './await.service';

describe('AwaitService', () => {
  let service: AwaitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AwaitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
