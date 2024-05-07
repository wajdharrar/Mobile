import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateVersionProviderComponent } from './update-version-provider.component';

describe('UpdateVersionProviderComponent', () => {
  let component: UpdateVersionProviderComponent;
  let fixture: ComponentFixture<UpdateVersionProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateVersionProviderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateVersionProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
