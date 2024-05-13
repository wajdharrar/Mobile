import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsRequestClientComponent } from './details-request-client.component';

describe('DetailsRequestClientComponent', () => {
  let component: DetailsRequestClientComponent;
  let fixture: ComponentFixture<DetailsRequestClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailsRequestClientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsRequestClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
