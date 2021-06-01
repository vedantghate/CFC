import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicalMeetComponent } from './physical-meet.component';

describe('PhysicalMeetComponent', () => {
  let component: PhysicalMeetComponent;
  let fixture: ComponentFixture<PhysicalMeetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhysicalMeetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysicalMeetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
