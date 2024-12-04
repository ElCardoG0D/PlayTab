import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActividadAnfitrionDetallePage } from './actividad-anfitrion-detalle.page';

describe('ActividadAnfitrionDetallePage', () => {
  let component: ActividadAnfitrionDetallePage;
  let fixture: ComponentFixture<ActividadAnfitrionDetallePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ActividadAnfitrionDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
