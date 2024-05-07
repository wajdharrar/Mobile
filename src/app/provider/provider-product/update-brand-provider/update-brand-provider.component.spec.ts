import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBrandProviderComponent } from './update-brand-provider.component';

describe('UpdateBrandProviderComponent', () => {
  let component: UpdateBrandProviderComponent;
  let fixture: ComponentFixture<UpdateBrandProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateBrandProviderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateBrandProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
