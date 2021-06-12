import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnlineMeetRoutingModule } from './online-meet-routing.module';
import { OnlineMeetComponent } from './components/online-meet/online-meet.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThanksDialogComponent } from './components/thanks-dialog/thanks-dialog.component';

import { MatDialogModule } from '@angular/material/dialog'

@NgModule({
  declarations: [
    OnlineMeetComponent,
    ThanksDialogComponent
  ],
  imports: [
    CommonModule,
    OnlineMeetRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule
  ]
})
export class OnlineMeetModule { }
