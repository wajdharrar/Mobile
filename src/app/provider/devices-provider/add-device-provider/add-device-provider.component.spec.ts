import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDeviceProviderComponent } from './add-device-provider.component';

describe('AddDeviceProviderComponent', () => {
  let component: AddDeviceProviderComponent;
  let fixture: ComponentFixture<AddDeviceProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddDeviceProviderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddDeviceProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
