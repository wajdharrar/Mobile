import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVersionProviderComponent } from './add-version-provider.component';

describe('AddVersionProviderComponent', () => {
  let component: AddVersionProviderComponent;
  let fixture: ComponentFixture<AddVersionProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddVersionProviderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddVersionProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
