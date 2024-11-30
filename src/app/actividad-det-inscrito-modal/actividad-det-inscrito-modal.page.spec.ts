import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActividadDetInscritoModalPage } from './actividad-det-inscrito-modal.page';

describe('ActividadDetInscritoModalPage', () => {
  let component: ActividadDetInscritoModalPage;
  let fixture: ComponentFixture<ActividadDetInscritoModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ActividadDetInscritoModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
