import { Component, OnInit, OnDestroy } from '@angular/core';
import { ISchedule, ScheduleService } from '../../../shared/services/schedule/schedule.service';
import { ActivatedRoute } from '@angular/router';
import { DateService } from '../../../shared/services/date/date.service';
import { AnalyticsService } from 'src/app/shared/services/analytics/analytics.service';

@Component({
  selector: 'app-upcoming-schedule',
  templateUrl: './upcoming-schedule.component.html',
  styleUrls: ['./upcoming-schedule.component.scss']
})
export class UpcomingScheduleComponent implements OnInit, OnDestroy {
  private schedule: ISchedule;
  private schedules: ISchedule[];

  day: number;

  daySchedule = [];

  routeSubscr;

  constructor(
    public scheduleService: ScheduleService,
    public date: DateService,
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
    // this.schedules = this.route.parent.snapshot.data['schedules'];
    // this.scheduleService.setSchedule(this.schedule);

    this._setDaySchedule();
    this.analytics.trackPageNavigation(`/${this.route.snapshot.parent.params.departureSpot}`);
  }



  _setDaySchedule() {
    this.daySchedule = this.scheduleService.getDayScheduleFromNowByHours();
  }

  resetNeedToUpdate() {
    this._setDaySchedule();
    this.scheduleService.resetNeedToUpdateSchedule();
  }

  isNeedToUpdate() {
    return this.scheduleService.needToUpdate;
  }
}
