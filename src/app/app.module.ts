import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClientJsonpModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeekdaysComponent } from './schedule/full-schedule/weekdays/weekdays.component';
import { TableComponent } from './schedule/table/table.component';
import { ApiService } from './shared/services/api/api.service';
import { HomeComponent } from './home/home.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UpcomingScheduleComponent } from './schedule/upcoming-schedule/upcoming-schedule.component';
import { FullScheduleComponent } from './schedule/full-schedule/full-schedule.component';
import { TimeToPipe } from './shared/pipes/time-to.pipe';
import { ResetComponent } from './reset/reset.component';
import { RouteListComponent } from './route-list/route-list.component';
import { SchNotifierComponent } from './sch-notifier/sch-notifier.component';
import { ApiInterceptor } from './shared/services/interceptor/api.interceptor';



@NgModule({
  declarations: [
    AppComponent,
    WeekdaysComponent,
    TableComponent,
    HomeComponent,
    ScheduleComponent,
    NotFoundComponent,
    UpcomingScheduleComponent,
    FullScheduleComponent,
    TimeToPipe,
    ResetComponent,
    RouteListComponent,
    SchNotifierComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule
  ],
  providers: [
    ApiService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
