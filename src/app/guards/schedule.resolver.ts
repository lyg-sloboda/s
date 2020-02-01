import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { ApiService } from '../shared/services/api/api.service';
import { RouteRulesService } from '../shared/services/route-rules/route-rules.service';

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
  constructor(private api: ApiService, private routeRules: RouteRulesService) { }

  resolve(router: ActivatedRouteSnapshot): Observable<any> {
    const departureSpot = router.paramMap.get('departureSpot');
    const direction = this.routeRules.getDirection(departureSpot);
    const requests = direction.rules.map((routeRule) => this.api.getSchedule(routeRule));
    return forkJoin(requests);
  }
}