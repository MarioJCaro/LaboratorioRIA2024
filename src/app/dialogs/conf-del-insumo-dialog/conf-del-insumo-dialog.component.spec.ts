import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfDelInsumoDialogComponent } from './conf-del-insumo-dialog.component';

describe('ConfDelInsumoDialogComponent', () => {
  let component: ConfDelInsumoDialogComponent;
  let fixture: ComponentFixture<ConfDelInsumoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfDelInsumoDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfDelInsumoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
