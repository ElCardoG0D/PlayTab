import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecoverPwPage } from './recover-pw.page';

describe('RecoverPwPage', () => {
  let component: RecoverPwPage;
  let fixture: ComponentFixture<RecoverPwPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoverPwPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
