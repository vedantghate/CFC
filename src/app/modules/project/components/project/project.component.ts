import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import * as XLSX from 'xlsx';
import jspdf from 'jspdf';
import autoTable from 'jspdf-autotable';
import { DatePipe } from '@angular/common';
import { ThanksDialogComponent } from '../thanks-dialog/thanks-dialog.component';
import { CalculationsService } from '../../../../services/calculations.service';
interface columnMapping {
  [key: string]: string;
}

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  public form: FormGroup;
  public submitted: boolean = false;
  public isPreview: boolean = false;

  public isBreakfast: boolean = false;
  public isLunch: boolean = false;
  public isSnack: boolean = false;
  public isDinner: boolean = false;

  public showCloud: boolean = false;
  public expandCloud: boolean = false;
  public contractCloud: boolean = false;
  public cfcValue: number;

  public todaysdate: Date = new Date();

  fileName = 'CFC_Input_Project';

  public columnMapping: columnMapping = {
    clubName: "Rotary Club of ",
    email: "Email ",
    mobileNo: "Mobile No. ",
    dateOfMeet: "Date ",
    memberCount: "No. of Members ",
    fourWCount: "No. of Four Wheeler(s) ",
    twoWCount: "No. of Two Wheeler(s) ",
    duration: "Duration(in minutes) ",
    lightsCount: "No. of Light(s) used ",
    fansCount: "No. of Fan(s) used ",
    audioCount: "No. of Audio System(s) used ",
    micCount: "No. of Mic(s) used ",
    projectorCount: "No. of Projector(s) used ",
    acCount: "No. of Air Conditioner(s) used ",
    beverageCount: "No. of Beverage(s) served ",
    fellowshipServed: "Fellowship served ",
    cutleryType: "Type of Crockery used ",
    vegBreakfastCount: "No. of Veg Brekfast served ",
    nonvegBreakfastCount: "No. of Non-Veg Brekfast served ",
    vegSnacksCount: "No. of Veg Snacks served ",
    nonvegSnacksCount: "No. of Non-Veg Snacks served ",
    vegLunchCount: "No. of Veg Lunch served ",
    nonvegLunchCount: "No. of Non Veg Lunch served ",
    vegDinnerCount: "No. of Veg Dinner served ",
    nonvegDinnerCount: "No. of Non Veg Dinner served ",
    giftCount: "No. of Gift(s) provided ",
    guestCount: "No. of Guest(s) invited ",
    //guestTravelMode: "Guest's travel mode ",
    guestStayPeriod: "Guest's stay period ",
    emailCount: "No. of Emails sent ",
    socialMediaMessageCount: "No. of Social Media messages sent ",
    distToProject: "Distance Travelled to Project Site"
  }



  constructor(private formBuilder: FormBuilder,
    public dialog: MatDialog,
    public datepipe: DatePipe,
    public calculationsService: CalculationsService) { }

  ngOnInit(): void {
    if (!this.isPreview) {
      this.form = this.formBuilder.group({
        clubName: ['', Validators.required],
        email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$')]],
        mobileNo: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
        dateOfMeet: ['', Validators.required],
        memberCount: ['', Validators.required],
        fourWCount: ['', Validators.required],
        twoWCount: ['', Validators.required],
        distToProject: ['', Validators.required],
        duration: ['', Validators.required],
        lightsCount: ['', Validators.required],
        fansCount: ['', Validators.required],
        audioCount: ['', Validators.required],
        micCount: ['', Validators.required],
        projectorCount: ['', Validators.required],
        acCount: ['', Validators.required],
        beverageCount: ['', Validators.required],
        fellowshipServed: ['', Validators.required],
        cutleryType: ['', Validators.required],
        vegBreakfastCount: ['', Validators.required],
        nonvegBreakfastCount: ['', Validators.required],
        vegSnacksCount: ['', Validators.required],
        nonvegSnacksCount: ['', Validators.required],
        vegLunchCount: ['', Validators.required],
        nonvegLunchCount: ['', Validators.required],
        vegDinnerCount: ['', Validators.required],
        nonvegDinnerCount: ['', Validators.required],
        giftCount: ['', Validators.required],
        guestCount: ['', Validators.required],
        //guestTravelMode: ['', Validators.required],
        guestStayPeriod: ['', Validators.required],
        emailCount: ['', Validators.required],
        socialMediaMessageCount: ['', Validators.required]
      }
      );

      this.setGuestValidations();
      this.setFellowshipValidations();
      this.setCutleryValidations();
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

  setGuestValidations() {
    this.form.get('guestCount')?.valueChanges.subscribe(
      count => {
        if (count > 0) {
          console.log("setting validators");
          //this.form.get('guestTravelMode')?.setValidators([Validators.required]);
          this.form.get('guestStayPeriod')?.setValidators([Validators.required]);
          //this.form.get('guestTravelMode')?.reset();
          this.form.get('guestStayPeriod')?.reset();
        } else {
          console.log("resetting validators");
          //this.form.get('guestTravelMode')?.setValidators(null);
          this.form.get('guestStayPeriod')?.setValidators(null);
          //this.form.get('guestTravelMode')?.setValue("None");
          this.form.get('guestStayPeriod')?.setValue(0);
        }
      }
    );
  }

  setFellowshipValidations() {
    this.form.get('fellowshipServed')?.valueChanges.subscribe(
      value => {
        if (value == 'true') {
          this.isBreakfast = this.isDinner = this.isLunch = this.isSnack = true;
          this.setBreakfastValidations();
          this.setLunchValidations();
          this.setSnacksValidations();
          this.setDinnerValidations();
        } else if (value == 'false') {
          this.isBreakfast = this.isDinner = this.isLunch = this.isSnack = true;
          this.setBreakfastValidations();
          this.setLunchValidations();
          this.setSnacksValidations();
          this.setDinnerValidations();
        }
      }
    );
  }

  setBreakfastValidations() {
    this.isBreakfast = !this.isBreakfast;
    if (this.isBreakfast) {
      this.form.get('vegBreakfastCount')?.setValidators([Validators.required]);
      this.form.get('nonvegBreakfastCount')?.setValidators([Validators.required]);
      this.form.get('vegBreakfastCount')?.reset();
      this.form.get('nonvegBreakfastCount')?.reset();
    } else {
      this.form.get('vegBreakfastCount')?.setValidators(null);
      this.form.get('nonvegBreakfastCount')?.setValidators(null);
      this.form.get('vegBreakfastCount')?.setValue(0);
      this.form.get('nonvegBreakfastCount')?.setValue(0);
    }
  }

  setLunchValidations() {
    this.isLunch = !this.isLunch;
    if (this.isLunch) {
      this.form.get('vegLunchCount')?.setValidators([Validators.required]);
      this.form.get('nonvegLunchCount')?.setValidators([Validators.required]);
      this.form.get('vegLunchCount')?.reset();
      this.form.get('nonvegLunchCount')?.reset();
    } else {
      this.form.get('vegLunchCount')?.setValidators(null);
      this.form.get('nonvegLunchCount')?.setValidators(null);
      this.form.get('vegLunchCount')?.setValue(0);
      this.form.get('nonvegLunchCount')?.setValue(0);
    }
  }

  setSnacksValidations() {
    this.isSnack = !this.isSnack;
    if (this.isSnack) {
      this.form.get('vegSnacksCount')?.setValidators([Validators.required]);
      this.form.get('nonvegSnacksCount')?.setValidators([Validators.required]);
      this.form.get('vegSnacksCount')?.reset();
      this.form.get('nonvegSnacksCount')?.reset();
    } else {
      this.form.get('vegSnacksCount')?.setValidators(null);
      this.form.get('nonvegSnacksCount')?.setValidators(null);
      this.form.get('vegSnacksCount')?.setValue(0);
      this.form.get('nonvegSnacksCount')?.setValue(0);
    }
  }

  setDinnerValidations() {
    this.isDinner = !this.isDinner;
    if (this.isDinner) {
      this.form.get('vegDinnerCount')?.setValidators([Validators.required]);
      this.form.get('nonvegDinnerCount')?.setValidators([Validators.required]);
      this.form.get('vegDinnerCount')?.reset();
      this.form.get('nonvegDinnerCount')?.reset();
    } else {
      this.form.get('vegDinnerCount')?.setValidators(null);
      this.form.get('nonvegDinnerCount')?.setValidators(null);
      this.form.get('vegDinnerCount')?.setValue(0);
      this.form.get('nonvegDinnerCount')?.setValue(0);
    }
  }

  setCutleryValidations() {
    if (this.isBreakfast || this.isSnack || this.isLunch || this.isDinner) {
      this.form.get('cutleryType')?.setValidators([Validators.required]);
      this.form.get('cutleryType')?.reset();
    } else {
      this.form.get('cutleryType')?.setValidators(null);
      //this.form.get('guestTravelMode')?.setValue("");
    }
  }

  checkFellowship(): boolean {
    if (this.form.value.fellowshipServed == 'true') {
      if (this.isBreakfast || this.isDinner || this.isLunch || this.isSnack) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  preview() {
    this.isPreview = true;
  }

  calculateCF() {
    this.cfcValue = this.calculationsService.getFWheeler(this.form.value.fourWCount, this.form.value.distToProject)
      + this.calculationsService.getTWheeler(this.form.value.twoWCount, this.form.value.distToProject)
      + this.calculationsService.getLight(this.form.value.lightsCount, this.form.value.duration)
      + this.calculationsService.getFan(this.form.value.fansCount, this.form.value.duration)
      + this.calculationsService.getAudio(this.form.value.audioCount, this.form.value.duration)
      + this.calculationsService.getMic(this.form.value.micCount, this.form.value.duration)
      + this.calculationsService.getProjector(this.form.value.projectorCount, this.form.value.duration)
      + this.calculationsService.getAC(this.form.value.acCount, this.form.value.duration)
      + this.calculationsService.getBeverage(this.form.value.beverageCount)
      + this.calculationsService.getCommunication(this.form.value.emailCount, this.form.value.socialMediaMessageCount)
      + this.calculationsService.getGuest(this.form.value.guestCount, this.form.value.guestStayPeriod)
      + this.calculateMeals()
      + this.calculateSB()

    this.cfcValue = this.cfcValue * 1000  //converting Tons to KGs
    this.cfcValue = Math.round((this.cfcValue + Number.EPSILON) * 100) / 100    //rounding off
  }

  calculateSB() {
    let vegMealCount = this.form.value.vegBreakfastCount
      + this.form.value.vegSnacksCount

    let nonvegMealCount = this.form.value.nonvegBreakfastCount
      + this.form.value.nonvegSnacksCount

    return this.calculationsService.getSB(vegMealCount, nonvegMealCount);
  }

  calculateMeals() {
    let vegMealCount = this.form.value.vegLunchCount
      + this.form.value.vegDinnerCount

    let nonvegMealCount = this.form.value.nonvegLunchCount
      + this.form.value.nonvegDinnerCount

    return this.calculationsService.getMeal(vegMealCount, nonvegMealCount)
  }


  submit() {
    this.submitted = true;
    if (!this.form.invalid && this.checkFellowship()) {
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
        this.contractCloud = false;
        this.openDialog();
      }, 9000)
    }
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(ThanksDialogComponent, {
      width: '30rem'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.submitted = false;
      //this.exportAsXLSX();
      this.exportAsPDF();
      this.isBreakfast = this.isDinner = this.isLunch = this.isSnack = true;
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

    sheetDataArr.push({ "Carbon Footprint Value": this.cfcValue + " kg" })

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(sheetDataArr);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    const excellFile = `${this.fileName}_Rotary Club of ${this.form.value.clubName}_${this.datepipe.transform(new Date(), 'dd-MM-yyyy')}.xlsx`;
    XLSX.writeFile(wb, excellFile);
  }

  public exportAsPDF() {
    let pdf = new jspdf();
    let cols = ["Field", "Value Entered"]
    let rows = [];

    var pageWidth = pdf.internal.pageSize.width || pdf.internal.pageSize.getWidth();

    var img = new Image();
    img.src = "assets/pdfHeader.png";
    pdf.addImage(img,'png',0,0,pageWidth,40);
    pdf.text("CFC - Project Visit", pageWidth / 2, 50, { align: 'center' });

    for (let key in this.form.value) {
      let row = [
        this.columnMapping[key], this.form.value[key],
      ]
      rows.push(row);
    }

    let cfcvalue = this.cfcValue + " kg";
    rows.push(["Carbon Footprint Value", cfcvalue])

    autoTable(pdf, {
      tableLineWidth: 1,
      margin: { top: 60 },
      body: rows,
      willDrawCell: function (data) {
        var rows = data.table.body;
        if (rows.length === 1) {
        } else if (data.row.index === rows.length - 1) {
          pdf.setFillColor(0, 255, 0);
          pdf.setFont("", "bold");
        }
      }
    })
    let pdfName = `${this.fileName}_Rotary Club of ${this.form.value.clubName}_${this.datepipe.transform(new Date(), 'dd-MM-yyyy')}.pdf`;
    pdf.save(pdfName);
  }

}
