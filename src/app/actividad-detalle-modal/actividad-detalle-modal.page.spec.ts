import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActividadDetalleModalPage } from './actividad-detalle-modal.page';

describe('ActividadDetalleModalPage', () => {
  let component: ActividadDetalleModalPage;
  let fixture: ComponentFixture<ActividadDetalleModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ActividadDetalleModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
