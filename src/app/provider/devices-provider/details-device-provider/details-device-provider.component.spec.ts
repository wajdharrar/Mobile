import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsDeviceProviderComponent } from './details-device-provider.component';

describe('DetailsDeviceProviderComponent', () => {
  let component: DetailsDeviceProviderComponent;
  let fixture: ComponentFixture<DetailsDeviceProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailsDeviceProviderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsDeviceProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
