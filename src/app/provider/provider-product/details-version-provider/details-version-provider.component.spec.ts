import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsVersionProviderComponent } from './details-version-provider.component';

describe('DetailsVersionProviderComponent', () => {
  let component: DetailsVersionProviderComponent;
  let fixture: ComponentFixture<DetailsVersionProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailsVersionProviderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsVersionProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
