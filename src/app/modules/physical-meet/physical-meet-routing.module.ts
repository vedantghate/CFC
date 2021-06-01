import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhysicalMeetComponent } from './components/physical-meet/physical-meet.component';

const routes: Routes = [
  {
    path: '',
    component: PhysicalMeetComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PhysicalMeetRoutingModule { }
