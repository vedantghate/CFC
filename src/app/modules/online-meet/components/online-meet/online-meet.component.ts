import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-online-meet',
  templateUrl: './online-meet.component.html',
  styleUrls: ['./online-meet.component.scss']
})
export class OnlineMeetComponent implements OnInit {
  public form: FormGroup;
  public submitted:boolean = false;
  public todaysdate: Date = new Date();
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      clubName: ['', Validators.required],
      mobileNo: ['', [Validators.required, Validators.pattern('\\+[0-9]{12}')]],
      dateOfMeet: ['', Validators.required],
      duration: ['', Validators.required],
      memberCount: ['', Validators.required],
      emailCount: ['', Validators.required],
      socialMediaMessageCount: ['', Validators.required]
    }
    );
  }

  get f() { return this.form.controls; }

  submit() {
    this.submitted = true;
    console.log(this.form.value);
    window.alert("Submitted Successfully");
  }

}
