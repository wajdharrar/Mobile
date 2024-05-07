import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateModelProviderComponent } from './update-model-provider.component';

describe('UpdateModelProviderComponent', () => {
  let component: UpdateModelProviderComponent;
  let fixture: ComponentFixture<UpdateModelProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateModelProviderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateModelProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
