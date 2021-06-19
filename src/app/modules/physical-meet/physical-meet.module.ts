import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhysicalMeetRoutingModule } from './physical-meet-routing.module';
import { PhysicalMeetComponent } from './components/physical-meet/physical-meet.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { ThanksDialogComponent } from './components/thanks-dialog/thanks-dialog.component';

import { MatDialogModule } from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';

@NgModule({
  declarations: [
    PhysicalMeetComponent,
    ThanksDialogComponent
  ],
  imports: [
    CommonModule,
    PhysicalMeetRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatDialogModule,
    MatCheckboxModule,
    MatRadioModule
  ]
})
export class PhysicalMeetModule { }
