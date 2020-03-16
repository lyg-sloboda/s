import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, forkJoin, timer } from 'rxjs';
import { ApiService } from '../services/api/api.service';
import { RouteRulesService } from '../services/route-rules/route-rules.service';
import { switchMap, tap, take } from 'rxjs/operators';
import { RootModalService } from '../services/root-modal/root-modal.service';

// https://www.callibrity.com/blog/angular-2-route-resolves
@Injectable()
export class SchedulesResolver implements Resolve<any> {
  constructor(
    private api: ApiService,
    private routeRules: RouteRulesService,
    private rootModalService: RootModalService,
  ) { }

  resolve(router: ActivatedRouteSnapshot): Observable<any> {
    this.rootModalService.showNext('spinner');

    const departureSpot = router.paramMap.get('departureSpot');
    const direction = this.routeRules.getDirection(departureSpot);
    const requests = direction.rules.map((routeRule) => this.api.getSchedule(routeRule));

    return forkJoin(requests)
      .pipe(
        tap(() => {
          this.rootModalService.hide('spinner');
        })
      );
  }
}
