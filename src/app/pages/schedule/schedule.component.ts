import { Component, OnInit, OnDestroy } from '@angular/core';
import { ISchedule, ScheduleService } from '../../shared/services/schedule/schedule.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { NotifierService } from 'src/app/shared/services/notifier/notifier.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
	schedule: ISchedule;
	schedules: ISchedule[];
  departureSpot: string;

  nav: Array<any>;
  routeShortcut: string;

  alert$: Observable<boolean>;

  get direction() {
    const schedule = this.schedules[0];
    if (!schedule) {
      return;
    }
    const direction = schedule.direction;
    return `${direction.from} &rarr; ${direction.to}`;
  }

  constructor(
    private route: ActivatedRoute,
    router: ActivatedRoute,
    private scheduleService: ScheduleService,
    private notifierService: NotifierService
  ) {
    this.routeShortcut = router.snapshot.params.departureSpot;
    this.alert$ = this.notifierService.alert$;
	}

  ngOnInit() {
    this.schedules = this.route.snapshot.data['schedules'];
    this.schedules = this.schedules ? this.schedules.filter((item) => !!item) : [];
    this.departureSpot = this.route.snapshot.params['departureSpot'];
    this.scheduleService.setDepartureSpot(this.departureSpot);
    this.scheduleService.setSchedules(this.schedules);

    this.nav = [
      {
        route: [''],
        title: 'Главная',
        gaEvent: null
      },
      {
        route: ['/', this.departureSpot],
        title: 'Сейчас',
        gaEvent: 'nowSchedule'
      },
      {
        route: ['/', this.departureSpot, 'full'],
        title: 'Всё расписание',
        gaEvent: 'allSchedule'
      }
    ];
  }

  openAlert() {
    this.notifierService.openScheduleIntro();
  }
}
