import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebaChartJsComponent } from './prueba-chart-js.component';

describe('PruebaChartJsComponent', () => {
  let component: PruebaChartJsComponent;
  let fixture: ComponentFixture<PruebaChartJsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PruebaChartJsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PruebaChartJsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
