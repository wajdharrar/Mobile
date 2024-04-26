import { TestBed } from '@angular/core/testing';

import { FeatureVersionService } from './feature-version.service';

describe('FeatureVersionService', () => {
  let service: FeatureVersionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeatureVersionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
