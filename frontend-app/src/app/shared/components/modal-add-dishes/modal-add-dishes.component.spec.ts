import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddDishesComponent } from './modal-add-dishes.component';

describe('ModalAddDishesComponent', () => {
  let component: ModalAddDishesComponent;
  let fixture: ComponentFixture<ModalAddDishesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAddDishesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAddDishesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
