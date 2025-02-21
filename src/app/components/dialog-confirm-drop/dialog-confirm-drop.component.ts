import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-confirm-drop',
  templateUrl: './dialog-confirm-drop.component.html',
  styleUrl: './dialog-confirm-drop.component.css'
})
export class DialogConfirmDropComponent {

  constructor(public dialogRef: MatDialogRef<DialogConfirmDropComponent>) {}


  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

}
