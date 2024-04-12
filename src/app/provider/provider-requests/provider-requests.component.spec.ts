import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderRequestsComponent } from './provider-requests.component';

describe('ProviderRequestsComponent', () => {
  let component: ProviderRequestsComponent;
  let fixture: ComponentFixture<ProviderRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProviderRequestsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProviderRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
