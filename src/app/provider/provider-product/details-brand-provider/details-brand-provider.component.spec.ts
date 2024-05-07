import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsBrandProviderComponent } from './details-brand-provider.component';

describe('DetailsBrandProviderComponent', () => {
  let component: DetailsBrandProviderComponent;
  let fixture: ComponentFixture<DetailsBrandProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailsBrandProviderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsBrandProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
