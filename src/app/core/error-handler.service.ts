import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ErrorDialogComponent } from '../features/error-dialog/error-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  constructor(private dialog: MatDialog, private router: Router) {}

  showError(message: string, redirect: boolean = false): void {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      data: { message },
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(() => {
      if (redirect) {
        this.router.navigate(['/']);
      }
    });
  }
}
