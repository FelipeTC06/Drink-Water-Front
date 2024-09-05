import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterTrackingComponent } from './water-tracking.component';

describe('WaterTrackingComponent', () => {
  let component: WaterTrackingComponent;
  let fixture: ComponentFixture<WaterTrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WaterTrackingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WaterTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
