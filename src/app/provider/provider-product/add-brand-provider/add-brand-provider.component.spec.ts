import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBrandProviderComponent } from './add-brand-provider.component';

describe('AddBrandProviderComponent', () => {
  let component: AddBrandProviderComponent;
  let fixture: ComponentFixture<AddBrandProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddBrandProviderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddBrandProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
