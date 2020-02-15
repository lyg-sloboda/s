import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { of, from } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CacheService } from '../cache/cache.service';

interface IScheduleRequestAtts {
  parser: string;
  from: number;
  to: number;
  filterNumbers: number[]
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // uri = isDevMode() ? 'http://localhost:3000' : window.location.origin;
  uri = isDevMode() ? 'https://lyg-sloboda-dev.herokuapp.com' : window.location.origin;
  // uri = isDevMode() ? 'http://localhost/030_schedule_3' : window.location.origin;

  constructor(private http: HttpClient, private cache: CacheService) { }

  getScheduleByDay(weekday: number) {
    return this.http.jsonp(`${this.uri}/api/schedule/${weekday}`, 'callback');
  }

  getSchedule(atts: IScheduleRequestAtts) {
    const {parser, from, to, filterNumbers} = atts;
    const params = filterNumbers ? { filterNumbers } : null;
    return this._get(`schedule/${parser}/${from}/${to}`, params);
  }

  getRouteSchedule(atts: IScheduleRequestAtts) {
    const { parser, from, to, filterNumbers } = atts;
    return this._get(`route/${parser}/${filterNumbers[0]}/${from}/${to}`);
  }

  getScheduleOld(departureSpot: string) {
    return this._get(`schedule-old/${departureSpot}`);
  }

  getRoutesList() {
    return this._get(`routes/list`);
  }

  // updateSchedule() {
  //   let stream$ = this.http.post(`${this.uri}/api/schedule/update`, {})
  //     .subscribe(() => {
  //       debugger

  //       stream$.unsubscribe();
  //     })
  // }

  _get( apiUri, params? ) {
    if (params) {
      params = new HttpParams({
        fromObject: params
      });
    } else {
      params = {};
    }
    const cacheKey = apiUri + params;
    if (this.cache.schedueInCache(cacheKey)) {
      return of(this.cache.get(cacheKey));
    }

    return this.http.get(`${this.uri}/api/${apiUri}`, {params})
      .pipe(
        map((data: any) => {
          if (data.error) {
            return this.cache.get(cacheKey) || data;
          }

          this.cache.setSchedule(cacheKey, data);
          return data;
        }),
        catchError(error => {
          return of(this.cache.get(cacheKey));
        })
        // catchError((err) => Observable.throw(err.json().error))
      );
  }

  // inCache(key) {
  //   return !!this.cache[key];
  // }

  // getCache(key) {
  //   return of(this.cache[key]);
  // }
}
