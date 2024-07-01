import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPanaderoDialogComponent } from './add-panadero-dialog.component';

describe('AddPanaderoDialogComponent', () => {
  let component: AddPanaderoDialogComponent;
  let fixture: ComponentFixture<AddPanaderoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddPanaderoDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddPanaderoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
