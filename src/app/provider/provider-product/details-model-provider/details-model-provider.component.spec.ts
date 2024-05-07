import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsModelProviderComponent } from './details-model-provider.component';

describe('DetailsModelProviderComponent', () => {
  let component: DetailsModelProviderComponent;
  let fixture: ComponentFixture<DetailsModelProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailsModelProviderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsModelProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
