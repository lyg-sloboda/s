import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ScheduleService } from '../../../../shared/services/schedule/schedule.service';
import { DateService } from '../../../../shared/services/date/date.service';

@Component({
  selector: 'app-weekdays',
  templateUrl: './weekdays.component.html',
  styleUrls: ['./weekdays.component.scss']
})
export class WeekdaysComponent implements OnInit {
  days = [
    'Пн',
    'Вт',
    'Ср',
    'Чт',
    'Пт',
    'Сб',
    'Вс'
  ];

  day: number;
  today: number;

  @Output() changeDay = new EventEmitter<any>();

  constructor(private scheduleService: ScheduleService, private date: DateService) {
    this.today = this.date.getToday();
  }

  ngOnInit() {
    this._setDay(this.today);
  }

  _setDay(day) {
    this.day = day;
    this.changeDay.next({day});
  }

  onClickDay(day) {
    this._setDay(day);
  }
}
