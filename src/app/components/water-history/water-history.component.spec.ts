import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterHistoryComponent } from './water-history.component';

describe('WaterHistoryComponent', () => {
  let component: WaterHistoryComponent;
  let fixture: ComponentFixture<WaterHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WaterHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WaterHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
