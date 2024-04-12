import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideProviderComponent } from './side-provider.component';

describe('SideProviderComponent', () => {
  let component: SideProviderComponent;
  let fixture: ComponentFixture<SideProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SideProviderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SideProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
