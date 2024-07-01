import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-panadero-dialog',
  templateUrl: './add-panadero-dialog.component.html',
  styleUrls: ['./add-panadero-dialog.component.scss']
})
export class AddPanaderoDialogComponent implements OnInit {
  panaderoForm!: FormGroup;
  isEditMode: boolean;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddPanaderoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!data.panadero;
  }

  ngOnInit(): void {
    this.panaderoForm = this.fb.group({
      id: [this.data.panadero ? this.data.panadero.id : null],
      email: [this.data.panadero ? this.data.panadero.email : '', [Validators.required, Validators.email]],
      telefono: [this.data.panadero ? this.data.panadero.telefono : '', Validators.required],
      password: ['']  
    });
  }

  onSave(): void {
    if (this.panaderoForm.valid) {
      const formValue = this.panaderoForm.value;

      if (!this.isEditMode || formValue.password) {
        this.dialogRef.close(formValue);
      } else {
        delete formValue.password;
        this.dialogRef.close(formValue);
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
