import { Component, OnInit, OnDestroy } from '@angular/core';
import { ISchedule, ScheduleService } from './shared/schedule/schedule.service';
import { ActivatedRoute } from '@angular/router';

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

  get direction() {
    let direction = this.schedules[0].direction;
    return `${direction.from} &rarr; ${direction.to}`;
  }

  constructor(private route: ActivatedRoute, router: ActivatedRoute, private scheduleService: ScheduleService) {
    this.routeShortcut = router.snapshot.params.departureSpot;
	}

  ngOnInit() {
	this.schedule = this.route.snapshot.data['schedule'];
    this.schedules = this.route.snapshot.data['schedules'];
    this.departureSpot = this.route.snapshot.params['departureSpot'];
    this.scheduleService.setDepartureSpot(this.departureSpot);
    this.scheduleService.setSchedules(this.schedules);

    this.nav = [
      {
        route: [''],
        title: 'Главная'
      },
      {
        route: ['/', this.departureSpot],
        title: 'Сейчас'
      },
      {
        route: ['/', this.departureSpot, 'full'],
        title: 'Всё расписание'
      }
    ];
  }
}
