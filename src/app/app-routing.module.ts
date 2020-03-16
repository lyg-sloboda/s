import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { ResetComponent } from './pages/reset/reset.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { SchedulesResolver } from './shared/guards/schedule.resolver';
import { UpcomingScheduleComponent } from './pages/schedule/upcoming-schedule/upcoming-schedule.component';
import { FullScheduleComponent } from './pages/schedule/full-schedule/full-schedule.component';
import { InfoComponent } from './pages/info/info.component';
import { OnLoadGuard } from './shared/guards/onload.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [OnLoadGuard],
    children: [
      { path: '', component: HomeComponent },
      { path: 'reset', component: ResetComponent },
      { path: 'routes', component: ResetComponent },
      {
        path: ':departureSpot',
        component: ScheduleComponent,
        resolve: {
          schedules: SchedulesResolver
        },
        children: [
          { path: '', component: UpcomingScheduleComponent },
          { path: 'full', component: FullScheduleComponent }
        ]
      },
      { path: 'info', component: InfoComponent },
    ]
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [SchedulesResolver, OnLoadGuard]
})
export class AppRoutingModule { }
