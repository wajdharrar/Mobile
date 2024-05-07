import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddModelProviderComponent } from './add-model-provider.component';

describe('AddModelProviderComponent', () => {
  let component: AddModelProviderComponent;
  let fixture: ComponentFixture<AddModelProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddModelProviderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddModelProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
