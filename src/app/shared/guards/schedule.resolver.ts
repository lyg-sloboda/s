import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, forkJoin, timer } from 'rxjs';
import { ApiService } from '../services/api/api.service';
import { RouteRulesService } from '../services/route-rules/route-rules.service';
import { SpinnerService } from '../services/spinner/spinner.service';
import { switchMap, finalize, tap, take } from 'rxjs/operators';

// https://www.callibrity.com/blog/angular-2-route-resolves
@Injectable()
export class ScheduleResolver implements Resolve<any> {
  constructor(private api: ApiService) { }

  resolve(router: ActivatedRouteSnapshot): Observable<any> {
    return this.api.getScheduleOld(router.paramMap.get('departureSpot'));
  }
}

// https://www.callibrity.com/blog/angular-2-route-resolves
@Injectable()
export class SchedulesResolver implements Resolve<any> {
  constructor(
    private api: ApiService,
    private routeRules: RouteRulesService,
    private spinnerService: SpinnerService
  ) { }

  resolve(router: ActivatedRouteSnapshot): Observable<any> {
    return this.spinnerService.show()
      .pipe(
        take(1),
        switchMap((d) => {
          const departureSpot = router.paramMap.get('departureSpot');
          const direction = this.routeRules.getDirection(departureSpot);
          const requests = direction.rules.map((routeRule) => this.api.getSchedule(routeRule));
          return forkJoin(requests);
        }),
        tap((data) => {
          this.spinnerService.hide();
        })
      )
  }
}
