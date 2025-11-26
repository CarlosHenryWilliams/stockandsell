import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogProductDelete } from './dialog-product-delete';

describe('DialogProductDelete', () => {
  let component: DialogProductDelete;
  let fixture: ComponentFixture<DialogProductDelete>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogProductDelete]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogProductDelete);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
