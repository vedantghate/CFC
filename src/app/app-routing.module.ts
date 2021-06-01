import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

import { OnlineMeetModule } from './modules/online-meet/online-meet.module';
import { PhysicalMeetModule } from './modules/physical-meet/physical-meet.module';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'online-meet',
    //loadChildren: './modules/online-meet/online-meet.module#OnlineMeetModule'
    loadChildren: () => import('src/app/modules/online-meet/online-meet.module').then(m => m.OnlineMeetModule)
  },
  {
    path: 'physical-meet',
    //loadChildren: './modules/physical-meet/physical-meet.module#PhysicalMeetModule',
    loadChildren: () => import('src/app/modules/physical-meet/physical-meet.module').then(m => m.PhysicalMeetModule)
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];

@NgModule({
  imports: [
    OnlineMeetModule,
    PhysicalMeetModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
