import { Component, inject } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-modal-add',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './modal-add.component.html',
  styleUrl: './modal-add.component.scss',
})
export class ModalAddComponent {
  readonly dialogRef = inject(MatDialogRef<ModalAddComponent>);
  animal: string = '';
  onNoClick(): void {
    this.dialogRef.close();
  }
}
