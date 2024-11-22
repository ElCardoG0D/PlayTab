import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminviewPage } from './adminview.page';

describe('AdminviewPage', () => {
  let component: AdminviewPage;
  let fixture: ComponentFixture<AdminviewPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
