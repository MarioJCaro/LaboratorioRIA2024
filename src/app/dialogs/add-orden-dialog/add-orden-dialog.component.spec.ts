import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrdenDialogComponent } from './add-orden-dialog.component';

describe('AddOrdenDialogComponent', () => {
  let component: AddOrdenDialogComponent;
  let fixture: ComponentFixture<AddOrdenDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddOrdenDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddOrdenDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
