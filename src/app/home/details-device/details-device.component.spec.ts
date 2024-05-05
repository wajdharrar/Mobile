import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsDeviceComponent } from './details-device.component';

describe('DetailsDeviceComponent', () => {
  let component: DetailsDeviceComponent;
  let fixture: ComponentFixture<DetailsDeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailsDeviceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
