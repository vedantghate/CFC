import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnlineMeetRoutingModule } from './online-meet-routing.module';
import { OnlineMeetComponent } from './components/online-meet/online-meet.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    OnlineMeetComponent
  ],
  imports: [
    CommonModule,
    OnlineMeetRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class OnlineMeetModule { }
