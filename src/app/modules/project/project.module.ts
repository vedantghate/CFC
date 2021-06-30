import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectRoutingModule } from './physical-meet-routing.module';
import { ProjectComponent } from './components/project/project.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { ThanksDialogComponent } from './components/thanks-dialog/thanks-dialog.component';

import { MatDialogModule } from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';

@NgModule({
  declarations: [
    ProjectComponent,
    ThanksDialogComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatDialogModule,
    MatCheckboxModule,
    MatRadioModule
  ]
})
export class ProjectModule { }
