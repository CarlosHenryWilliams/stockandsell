import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogProductAddEdit } from './dialog-product-add-edit';

describe('DialogProductAddEdit', () => {
  let component: DialogProductAddEdit;
  let fixture: ComponentFixture<DialogProductAddEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogProductAddEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogProductAddEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
