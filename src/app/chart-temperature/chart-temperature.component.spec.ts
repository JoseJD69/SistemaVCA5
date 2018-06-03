import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartTemperatureComponent } from './chart-temperature.component';

describe('ChartTemperatureComponent', () => {
  let component: ChartTemperatureComponent;
  let fixture: ComponentFixture<ChartTemperatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartTemperatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartTemperatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
