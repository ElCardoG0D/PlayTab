import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CambiacomunaPage } from './cambiacomuna.page';

describe('CambiacomunaPage', () => {
  let component: CambiacomunaPage;
  let fixture: ComponentFixture<CambiacomunaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CambiacomunaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
