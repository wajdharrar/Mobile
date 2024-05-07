import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDeviceProviderComponent } from './update-device-provider.component';

describe('UpdateDeviceProviderComponent', () => {
  let component: UpdateDeviceProviderComponent;
  let fixture: ComponentFixture<UpdateDeviceProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateDeviceProviderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateDeviceProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
