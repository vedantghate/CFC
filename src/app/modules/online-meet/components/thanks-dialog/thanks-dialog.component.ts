import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-thanks-dialog',
  templateUrl: './thanks-dialog.component.html',
  styleUrls: ['./thanks-dialog.component.scss']
})
export class ThanksDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ThanksDialogComponent>) { }

  ngOnInit(): void {
    setTimeout(()=>{ this.dialogRef.close() }, 10000)
  }

}
