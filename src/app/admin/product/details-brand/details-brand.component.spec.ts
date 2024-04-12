import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsBrandComponent } from './details-brand.component';

describe('DetailsBrandComponent', () => {
  let component: DetailsBrandComponent;
  let fixture: ComponentFixture<DetailsBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailsBrandComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
