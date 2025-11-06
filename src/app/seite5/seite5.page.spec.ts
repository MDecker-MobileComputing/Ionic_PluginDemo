import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Seite5Page } from './seite5.page';

describe('Seite5Page', () => {
  let component: Seite5Page;
  let fixture: ComponentFixture<Seite5Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Seite5Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
