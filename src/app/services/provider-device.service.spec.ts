import { TestBed } from '@angular/core/testing';

import { ProviderDeviceService } from './provider-device.service';

describe('ProviderDeviceService', () => {
  let service: ProviderDeviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProviderDeviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
