import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartSolarRadComponent } from './chart-solar-rad.component';

describe('ChartSolarRadComponent', () => {
  let component: ChartSolarRadComponent;
  let fixture: ComponentFixture<ChartSolarRadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartSolarRadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartSolarRadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
