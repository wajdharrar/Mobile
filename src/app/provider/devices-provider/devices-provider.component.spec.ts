import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicesProviderComponent } from './devices-provider.component';

describe('DevicesProviderComponent', () => {
  let component: DevicesProviderComponent;
  let fixture: ComponentFixture<DevicesProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DevicesProviderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DevicesProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
