import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClientJsonpModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiService } from './shared/services/api/api.service';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { TimeToPipe } from './shared/pipes/time-to.pipe';
import { RouteListComponent } from './pages/route-list/route-list.component';
import { WeekdaysComponent } from './pages/schedule/full-schedule/weekdays/weekdays.component';
import { TableComponent } from './pages/schedule/table/table.component';
import { HomeComponent } from './pages/home/home.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { UpcomingScheduleComponent } from './pages/schedule/upcoming-schedule/upcoming-schedule.component';
import { FullScheduleComponent } from './pages/schedule/full-schedule/full-schedule.component';
import { ResetComponent } from './pages/reset/reset.component';
import { CacheInterceptor } from './shared/services/interceptor/cache.interceptor';
import { SpinnerComponent } from './common/spinner/spinner.component';
import { InfoComponent } from './pages/info/info.component';
import { CarouselComponent } from './common/carousel/carousel.component';
import { AppIntroductionComponent } from './common/app-introduction/app-introduction.component';
import { RootModalComponent } from './common/root-modal/root-modal.component';
import { CarouselSlideComponent } from './common/carousel-slide/carousel-slide.component';
import { GaEventDirective } from './shared/directives/ga-event/ga-event.directive';



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
    RootModalComponent,
    SpinnerComponent,
    InfoComponent,
    CarouselComponent,
    AppIntroductionComponent,
    CarouselSlideComponent,
    GaEventDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
  ],
  providers: [
    ApiService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CacheInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
