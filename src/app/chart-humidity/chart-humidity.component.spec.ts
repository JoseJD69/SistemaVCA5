import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartHumidityComponent } from './chart-humidity.component';

describe('ChartHumidityComponent', () => {
  let component: ChartHumidityComponent;
  let fixture: ComponentFixture<ChartHumidityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartHumidityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartHumidityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
