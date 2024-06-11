import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInsumosDialogComponent } from './view-insumos-dialog.component';

describe('ViewInsumosDialogComponent', () => {
  let component: ViewInsumosDialogComponent;
  let fixture: ComponentFixture<ViewInsumosDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewInsumosDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewInsumosDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
