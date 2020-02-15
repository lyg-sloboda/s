import { Pipe, PipeTransform, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { interval, timer } from 'rxjs';
import { take } from 'rxjs/operators';
import { DateService } from '../services/date/date.service';
import { ScheduleService } from '../services/schedule/schedule.service';

const MIN_IN_MS = 1000 * 60;

@Pipe({
  name: 'timeTo',
  pure: false
})
export class TimeToPipe implements PipeTransform, OnDestroy {
  subscribe;

  result: string;

  constructor(private scheduleService: ScheduleService, private date: DateService, private cd: ChangeDetectorRef) {}

  transform(date: Date, ...args: any[]): any {
    if (!this.subscribe) {
      this._initResult(date);

      // need to use runOutsideZone

      timer(this._getFirstTimerMs()).subscribe(() => {
        this.subscribe = interval(MIN_IN_MS)
          .pipe(take(this.scheduleService.pastMin))
          .subscribe(() => {
            this._initResult(date);
            this.cd.markForCheck();
          }, null, () => { // on complete
            this.scheduleService.setNeedToUpdateSchedule();
          });
      });
    }

    return this.result;
  }

  ngOnDestroy() {
    // this.subscribe.unsubscribe();
  }

  _getFirstTimerMs() {
    const now = new Date();
    let nextMin = new Date();
    nextMin.setMinutes(nextMin.getMinutes() + 1);
    nextMin.setSeconds(0);
    nextMin.setMilliseconds(0);

    return +nextMin - +now;
  }

  _initResult(date: Date) {
    let now = this.date.getNow();
    this.result = this._getNearestMin(date.getTime(), now.getTime());
  }

  _getNearestMin(futureTime, compareTime, isNextDay: boolean = false) {
    // const addTime = isNextDay ? this._getMs('24:00') : 0;
    // const dateDelta = new Date(futureTime - compareTime + addTime);
    let delta = futureTime - compareTime;
    // debugger
    let isNegative = false;
    if (0 > delta) {
      delta = compareTime - futureTime;
      isNegative = true;
    }
    const dateDelta = new Date(delta);
    const hours = dateDelta.getUTCHours();

    if (isNegative) {
      const min = dateDelta.getMinutes();
      const sign = 0 === min ? '' : '-';
      return `${sign}${dateDelta.getMinutes()} мин`;
    }

    if (hours > 0) {
      return `> ${hours} ч`;
    }


    return `~${dateDelta.getMinutes()} мин`;
  }

}
