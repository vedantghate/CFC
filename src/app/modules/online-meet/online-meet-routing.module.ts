import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnlineMeetComponent } from './components/online-meet/online-meet.component';

const routes: Routes = [
  {
    path: '',
    component: OnlineMeetComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnlineMeetRoutingModule { }
