import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { ResetComponent } from './pages/reset/reset.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { SchedulesResolver, ScheduleResolver } from './shared/guards/schedule.resolver';
import { UpcomingScheduleComponent } from './pages/schedule/upcoming-schedule/upcoming-schedule.component';
import { FullScheduleComponent } from './pages/schedule/full-schedule/full-schedule.component';

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
