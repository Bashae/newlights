import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListedPage } from './listed.page';

describe('ListedPage', () => {
  let component: ListedPage;
  let fixture: ComponentFixture<ListedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListedPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
