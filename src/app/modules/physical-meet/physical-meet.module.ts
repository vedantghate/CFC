import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhysicalMeetRoutingModule } from './physical-meet-routing.module';
import { PhysicalMeetComponent } from './components/physical-meet/physical-meet.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';


@NgModule({
  declarations: [
    PhysicalMeetComponent
  ],
  imports: [
    CommonModule,
    PhysicalMeetRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule
  ]
})
export class PhysicalMeetModule { }
