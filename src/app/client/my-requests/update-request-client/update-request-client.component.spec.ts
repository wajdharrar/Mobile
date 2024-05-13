import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRequestClientComponent } from './update-request-client.component';

describe('UpdateRequestClientComponent', () => {
  let component: UpdateRequestClientComponent;
  let fixture: ComponentFixture<UpdateRequestClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateRequestClientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateRequestClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
