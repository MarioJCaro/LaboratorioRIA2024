import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInsumoDialogComponent } from './add-insumo-dialog.component';

describe('AddInsumoDialogComponent', () => {
  let component: AddInsumoDialogComponent;
  let fixture: ComponentFixture<AddInsumoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddInsumoDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddInsumoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
