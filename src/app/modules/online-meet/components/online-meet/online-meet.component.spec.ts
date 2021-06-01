import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineMeetComponent } from './online-meet.component';

describe('OnlineMeetComponent', () => {
  let component: OnlineMeetComponent;
  let fixture: ComponentFixture<OnlineMeetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnlineMeetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineMeetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
