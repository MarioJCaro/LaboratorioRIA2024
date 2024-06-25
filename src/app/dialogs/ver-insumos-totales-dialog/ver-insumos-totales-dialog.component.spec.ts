import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerInsumosTotalesDialogComponent } from './ver-insumos-totales-dialog.component';

describe('VerInsumosTotalesDialogComponent', () => {
  let component: VerInsumosTotalesDialogComponent;
  let fixture: ComponentFixture<VerInsumosTotalesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerInsumosTotalesDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerInsumosTotalesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
