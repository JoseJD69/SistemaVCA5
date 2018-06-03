import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartRainComponent } from './chart-rain.component';

describe('ChartRainComponent', () => {
  let component: ChartRainComponent;
  let fixture: ComponentFixture<ChartRainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartRainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartRainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
