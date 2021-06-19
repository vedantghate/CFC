import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import * as XLSX from 'xlsx';

import { ThanksDialogComponent } from '../thanks-dialog/thanks-dialog.component';

@Component({
  selector: 'app-online-meet',
  templateUrl: './online-meet.component.html',
  styleUrls: ['./online-meet.component.scss']
})
export class OnlineMeetComponent implements OnInit {
  public form: FormGroup;
  public submitted: boolean = false;
  public isPreview: boolean = false;
  public todaysdate: Date = new Date();
  constructor(private formBuilder: FormBuilder, public dialog: MatDialog) { }

  fileName = 'CFC_Input_Online';

  ngOnInit(): void {
    if (!this.isPreview) {
      this.form = this.formBuilder.group({
        clubName: ['', Validators.required],
        email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$')]],
        mobileNo: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
        dateOfMeet: ['', Validators.required],
        duration: ['', Validators.required],
        memberCount: ['', Validators.required],
        emailCount: ['', Validators.required],
        socialMediaMessageCount: ['', Validators.required]
      }
      );
    }
  }

  ngAfterViewInit() {
    const phoneInputField = document.querySelector("#phone");
    const phoneInput = (<any>window).intlTelInput(phoneInputField, {
      preferredCountries: ["in"],
      utilsScript:
        "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
    });
  }

  get f() { return this.form.controls; }

  preview() {
    this.isPreview = true;
  }

  submit() {
    this.submitted = true;
    if (!this.form.invalid) {
      this.openDialog();
    }
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(ThanksDialogComponent, {
      width: '30rem'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.submitted = false;
      this.exportAsXLSX();
      this.ngOnInit();
    });
  }


  public exportAsXLSX(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet([this.form.value]);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    const excellFile = `${this.fileName}_${new Date().getTime()}.xlsx`;
    XLSX.writeFile(wb, excellFile);
  }

}
