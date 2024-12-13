import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CambioActividadFavoritaPage } from './cambio-actividad-favorita.page';

describe('CambioActividadFavoritaPage', () => {
  let component: CambioActividadFavoritaPage;
  let fixture: ComponentFixture<CambioActividadFavoritaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CambioActividadFavoritaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
