import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ErrorDialogData } from '../../models/errorDialog';

@Component({
  selector: 'app-error-handling',
  templateUrl: './error-handling.component.html',
  styleUrl: './error-handling.component.css'
})
export class ErrorHandlingComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: ErrorDialogData) {
  }

}
