import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScheduleService, ISchedule } from '../../../shared/services/schedule/schedule.service';
import { pluck } from 'rxjs/operators';
import { AnalyticsService } from 'src/app/shared/services/analytics/analytics.service';

@Component({
  selector: 'app-full-schedule',
  templateUrl: './full-schedule.component.html',
  styleUrls: ['./full-schedule.component.scss']
})
export class FullScheduleComponent implements OnInit, OnDestroy {
  private schedule: ISchedule;

  day: number;

  daySchedule = [];

  routeSubscr;

  constructor(
    private scheduleService: ScheduleService,
    private route: ActivatedRoute,
    private analytics: AnalyticsService
  ) {
    // see alt version whithout subscribe on ngOnInit()
    // this.routeSubscr = this.route.data
    //   .pipe(pluck('schedule'))
    //   .subscribe((val: ISchedule) => {
    //     this.schedule = val;
    //     this.scheduleService.setSchedule(this.schedule.schedule);
    //     this.daySchedule = this.scheduleService.getDayScheduleByHours(this.day);
    //   });
  }

  ngOnDestroy() {
    // this.routeSubscr.unsubscribe();
  }

  ngOnInit() {
    // see alt version with subscribe in constructor()
    // this.schedule = this.route.parent.snapshot.data['schedule'];
    // this.scheduleService.setSchedule(this.schedule);
    this.analytics.trackPageNavigation(`/${this.route.snapshot.parent.params.departureSpot}/full`);

  }

  onChangeDay(event: {day: number}) {
    this.day = event.day;
    this.daySchedule = this.scheduleService.getDayFullSchedule(this.day);
  }

}
