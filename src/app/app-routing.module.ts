import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { ScheduleResolver, SchedulesResolver } from './guards/schedule.resolver';
import { NotFoundComponent } from './not-found/not-found.component';
import { UpcomingScheduleComponent } from './schedule/upcoming-schedule/upcoming-schedule.component';
import { FullScheduleComponent } from './schedule/full-schedule/full-schedule.component';
import { ResetComponent } from './reset/reset.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'reset', component: ResetComponent },
  { path: 'routes', component: ResetComponent },
  {
    path: ':departureSpot',
    component: ScheduleComponent,
    resolve: {
      schedule: ScheduleResolver,
      schedules: SchedulesResolver
    },
    children: [
      { path: '', component: UpcomingScheduleComponent },
      { path: 'full', component: FullScheduleComponent }
    ]
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ScheduleResolver, SchedulesResolver]
})
export class AppRoutingModule { }
