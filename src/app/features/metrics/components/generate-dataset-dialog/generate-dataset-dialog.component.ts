
import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';


@Component({
  selector: 'app-generate-dataset-dialog',

  imports: [
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDialogModule
  ],

  templateUrl: './generate-dataset-dialog.component.html',
  styleUrl: './generate-dataset-dialog.component.scss'
})
export class GenerateDatasetDialogComponent {

  private dialogRef = inject(MatDialogRef);
  private fb = inject(FormBuilder);

  form = this.fb.group({
    size: [1000, [Validators.required, Validators.min(1)]],
    format: ['json', Validators.required]
  });

  close() {
    this.dialogRef.close();
  }

  confirm() {
    this.dialogRef.close(this.form.value);
  }

}
