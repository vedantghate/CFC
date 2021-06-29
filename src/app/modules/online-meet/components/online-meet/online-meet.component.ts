import { asNativeElements, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import * as XLSX from 'xlsx';
import { DatePipe } from '@angular/common';

import { CalculationsService } from '../../../../services/calculations.service';
import { ThanksDialogComponent } from '../thanks-dialog/thanks-dialog.component';

interface columnMapping {
  [key: string]: string;
}


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

  public showCloud: boolean = false;
  public expandCloud: boolean = false;
  public contractCloud: boolean = false;
  public cfcValue: number;

  constructor(private formBuilder: FormBuilder, 
    public dialog: MatDialog, 
    public datepipe: DatePipe,
    public calculationsService: CalculationsService) { }

  fileName = 'CFC_Input_Online';

  public columnMapping: columnMapping = {
    clubName: "Rotary Club of ",
    email: "Email ",
    mobileNo: "Mobile No. ",
    dateOfMeet: "Date ",
    duration: "Duration(in minutes) ",
    memberCount: "No. of Members ",
    emailCount: "No. of Emails sent ",
    socialMediaMessageCount: "No. of Social Media Messages sent "
  }

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

  calculateCF() {
    this.cfcValue = this.calculationsService.getOnline(this.form.value.memberCount, this.form.value.duration)
      + this.calculationsService.getCommunication(this.form.value.emailCount, this.form.value.socialMediaMessageCount)

    this.cfcValue = Math.round((this.cfcValue + Number.EPSILON) * 100) / 100
  }

  submit() {
    this.submitted = true;

    if (!this.form.invalid) {
      this.calculateCF();
      this.submitted = false;
      this.showCloud = true;
      setTimeout(() => {
        this.expandCloud = true;
      }, 10);
      setTimeout(() => {
        this.contractCloud = true;
        this.expandCloud = false;
      }, 7000);
      setTimeout(() => {
        this.showCloud = false;
        this.openDialog();
      }, 9000)

    }
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(ThanksDialogComponent, {
      width: '30rem'
    });
    this.exportAsXLSX();
    dialogRef.afterClosed().subscribe(result => {
      this.submitted = false;
      this.ngOnInit();
    });
  }


  public exportAsXLSX(): void {
    let sheetDataArr = [];
    for (let key in this.form.value) {
      let fields = {
        "Field": this.columnMapping[key],
        "Value Entered": this.form.value[key],
        "": ""
      }
      sheetDataArr.push(fields);
    }

    sheetDataArr.push({ "Carbon Footprint Value": this.cfcValue })

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(sheetDataArr);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    const excellFile = `${this.fileName}_Rotary Club of ${this.form.value.clubName}_${this.datepipe.transform(new Date(), 'dd-MM-yyyy')}.xlsx`;
    XLSX.writeFile(wb, excellFile);
  }

}
