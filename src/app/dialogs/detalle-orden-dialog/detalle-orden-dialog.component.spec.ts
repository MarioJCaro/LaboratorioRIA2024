import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleOrdenDialogComponent } from './detalle-orden-dialog.component';

describe('DetalleOrdenDialogComponent', () => {
  let component: DetalleOrdenDialogComponent;
  let fixture: ComponentFixture<DetalleOrdenDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetalleOrdenDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalleOrdenDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
