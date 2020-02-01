import { Injectable } from '@angular/core';
import { DateService } from '../date/date.service';
import { ScheduleRoute, IRoute, IDefaultRoute } from './schedule-route';
import { forkJoin } from 'rxjs';
import { RouteRulesService } from '../../../shared/services/route-rules/route-rules.service';
import { ActivatedRoute } from '@angular/router';
import { getDirectionId } from '../../../../../../shared/utils';

export interface ISchedule {
  direction?: any;
  schedule?: any;
  error?: any;
}

interface IDayRoute {
  hour: number;
  routes: Array<ScheduleRoute>;
}

type TSheduleDays = Array<IDayRoute>;

interface ISheduleDay {
  weekDay: number;
  dayLabel: string;
  dayRoutes: TSheduleDays;
}


@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  // show today's {n} hours of next day at the end today, 
  // this is about 24 hour = 00 hours from next day
  // also it allows to display 01 hour of next day as today schedule
  addHoursFromNextDay = 6; 

  schedule: Array<IDefaultRoute> | [];

  schedules;
  scheduleByDay;

  // scheduleByDay: Array<ISheduleDay> | [] = [];

  error: any | null;
  isError: boolean = false;

  needToUpdate: boolean = false;

  pastMin = 15;

  departureSpot: string;

  constructor(
    private date: DateService, 
    private routeRules: RouteRulesService
  ) {}

  getDirectionRouteRules(departureSpot) {
    return this.routeRules.getDirection(departureSpot);
  }

  getRouteRules(directionId, departureSpot) {
    const directionRules = this.getDirectionRouteRules(departureSpot);
    
    return (directionRules.rules.filter((routeRules) => {
      const id = getDirectionId(routeRules.from, routeRules.to);
      return directionId === id;
    })).shift();
  }

  // setSchedule(data) {
  //   this.schedule = data.schedule || [];
  //   this.error = data.error || null;
  //   this.isError = !!this.error;

  //   // if (this.schedule.length) {
  //   //   this.scheduleByDay = this._getScheduleByDay(this.schedule);
  //   //   this.scheduleByDay = this._sortAndGroupScheduleByTime(this.scheduleByDay);
  //   // }
  // }

  public setSchedules(schedules) {
    if (schedules.length) {
      this.scheduleByDay = this._getMergedSchedules(schedules);
      this.scheduleByDay = this._sortAndGroupScheduleByTime(this.scheduleByDay);
    }
  }
  public setDepartureSpot(spot) {
    this.departureSpot = spot;
  }

  _getMergedSchedules(schedules): ISheduleDay[] {
    return schedules.reduce((routesByDay, schedule) => {
      const routeRules = this.getRouteRules(schedule.id, this.departureSpot);

      // if is error from server
      if (!schedule || !schedule.schedule) {
        return routesByDay;
      }

      schedule.schedule.forEach((day) => {
        const _dayRoutes = day.dayRoutes.map((route) => new ScheduleRoute(route, day.day, this.date, routeRules));

        if (!routesByDay[day.day]) {
          routesByDay[day.day] = {
            weekDay: day.day,
            dayLabel: this.date.getDayLabel(day.day),
            dayRoutes: _dayRoutes
          } as ISheduleDay;
          return;
        }

        routesByDay[day.day].dayRoutes = routesByDay[day.day].dayRoutes.concat(_dayRoutes);
      });

      return routesByDay;
    }, []);
  }

  public getDayScheduleFromNowByHours() {
    const start = this.date.getNow();
    const end = this.date.getNow();

    end.setDate(end.getDate() + 1);

    return this._getSchedulePeriodByTime(start, end);
  }

  public getDayFullSchedule(weekDay): Array<ISheduleDay> {
    return [this.scheduleByDay[weekDay]];
  }

  // @need to test ??
  // _getScheduleByDay(schedule: Array<IDefaultRoute>): Array<ISheduleDay> {
  //   let scheduleByDay = [];

  //   schedule.forEach((route) => {
  //     const routes = new ScheduleRoutes(route, this.date);

  //     routes.getRoutesByDay().forEach((route, day) => {
  //       if (!scheduleByDay[day]) {
  //         scheduleByDay[day] = {
  //           weekDay: day,
  //           dayLabel: this.date.getDayLabel(day),
  //           dayRoutes: [],
  //         };
  //       }

  //       // create new route object 
  //       // because the same routes can have different day number
  //       scheduleByDay[day].dayRoutes.push(route);
  //     });
  //   });

  //   return scheduleByDay;
  // } 

  // @need to test
  _sortAndGroupScheduleByTime(scheduleByDay: Array<ISheduleDay>): Array<ISheduleDay> {
    return scheduleByDay.map((dayData: ISheduleDay) => {
      dayData.dayRoutes = this._sortByDepartureTime(dayData.dayRoutes);
      dayData.dayRoutes = this._sortByArrivalTime(dayData.dayRoutes);
      dayData.dayRoutes = this._groupByHour(dayData.dayRoutes);
      return dayData;
    });
  }

  // @need test
  _groupByHour(routes): Array<IDayRoute> {
    let output = [];

    routes.forEach((route) => {
      // const hour = route.departureDate.getUTCHours();
      const hour = route.departureDate.getHours();
      if (!output[hour])
        output[hour] = [];

      output[hour].push(route);
    });

    // add unexisted hours
    if (!output[23]) {
      output[23] = [];
    }

    // set default value in empty routes
    for (let index = 0; index < output.length; index++) {
      if (!output[index]) {
        output[index] = [];
      }
    }

    return output.map((routes, hour) => ({ hour, routes }));
  }

  // @need test
  _sortByDepartureTime(routes) {
    // see https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    return routes.sort((routeA, routeB) => {
      const routeAtime = routeA.departureDate.getTime();
      const routeBtime = routeB.departureDate.getTime();
      // a меньше b по некоторому критерию сортировки
      if (routeAtime < routeBtime) {
        return -1;
      }
      // a больше b по некоторому критерию сортировки
      if (routeAtime > routeBtime) {
        return 1;
      }
      // a должно быть равным b
      return 0;
    }); 
  }

  // @need test
  _sortByArrivalTime(routes) {
    return routes.sort((routeA, routeB) => {
      if (routeA.departureDate.getTime() !== routeB.departureDate.getTime()) {
        return 0;
      }

      return (routeA.arrivalDate.getTime() > routeB.arrivalDate.getTime()) ? 1 : -1;
    });
  }

  _getSchedulePeriodByTime(start: Date, end: Date): Array<ISheduleDay> {
    const startDay = this.date.getWeekDay(start);
    const endDay = this.date.getWeekDay(end);

    start.setMinutes(start.getMinutes() - this.pastMin);
    const startTimeMs = start.getTime();
    const endTimeMs = end.getTime();

    const period = this._getSchedulePeriodByDay(startDay, endDay);

    // filter by time
    return period.map((dayData: ISheduleDay) => {
      let dayRoutes;
      if (dayData.weekDay === startDay) {
        dayRoutes = this._filterInActiveHoursBeforeTime(startTimeMs, dayData);
        dayRoutes = this._filterInActiveRoutesByTime(startTimeMs, dayRoutes);
      }

      if (dayData.weekDay === endDay) {
        dayRoutes = this._filterInActiveHoursAfterTime(endTimeMs, dayData);
      }

      return { ...dayData, dayRoutes};
    });
  }

  _filterInActiveRoutesByTime(startTimeMs: number, dayRoutes: TSheduleDays): TSheduleDays {
    return dayRoutes.map((hourRoutes) => {
      // remove inActive routes
      let routes = hourRoutes.routes.filter((route) => route.isActiveNow(startTimeMs));

      // skip hours without routes
      if (!hourRoutes.routes.length)
        return hourRoutes;

      // add last route at hour if hour is active
      hourRoutes.routes = routes.length ? routes : [hourRoutes.routes.pop()];
      return hourRoutes;
    });
  }

  _filterInActiveHoursBeforeTime(timeMs: number, dayData: ISheduleDay): TSheduleDays {
    return dayData.dayRoutes.filter((hourRoutes) => {
      let date = this.date.getWeekDayDateObj(dayData.weekDay, `${hourRoutes.hour}:59`);

      if (date.getTime() >= timeMs) {
        // filter hours without routes
        // if (! hourRoutes.routes.length) {
        //   return false;
        // }
        // const lastRoute = hourRoutes.routes[hourRoutes.routes.length - 1];
        // if (timeMs > lastRoute.departureDate.getTime()) {
        //   return false;
        // }

        return true;
      }

      return false;
    });
  }

  _filterInActiveHoursAfterTime(timeMs: number, dayData: ISheduleDay): TSheduleDays {
    return dayData.dayRoutes.filter((hourRoutes) => {
      let date = this.date.getWeekDayDateObj(dayData.weekDay, `${hourRoutes.hour}:59`);

      return date.getTime() <= timeMs;
    });
  }

  // @tested
  _getSchedulePeriodByDay(startDay: number, endDay: number): Array<ISheduleDay> {
    let output = [];

    startDay = this.date.getCorrectWeekDayNumber(startDay);
    endDay = this.date.getCorrectWeekDayNumber(endDay);

    if (endDay >= startDay) {
      for (let day = startDay; day <= endDay; day++) {
        output.push(this.scheduleByDay[day]);
      }
  
      return output;
    }

    /**
     * Case for period from sunday (6) till monday (0)
     * return, for ex., (6, 0) - 2 days
     */
    let segment1 = this._getSchedulePeriodByDay(startDay, 6);
    let segment2 = this._getSchedulePeriodByDay(0, endDay);

    return segment1.concat(segment2);
  }

  setNeedToUpdateSchedule() {
    this.needToUpdate = true;
  }
  resetNeedToUpdateSchedule() {
    this.needToUpdate = false;
  }
}
