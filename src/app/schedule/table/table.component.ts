import { Component, Input, OnChanges } from '@angular/core';
import { ScheduleService } from '../shared/schedule/schedule.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnChanges {
  @Input() daySchedule: Array<any>;
  @Input() type: string;

  scheduleFullDayByHours: Array<{hour: number | string, routes: any}> = [];


  // hours$;

  constructor(private scheduleService: ScheduleService) {
    
  }

  // ngOnChanges(change) {
  //   if (change.daySchedule) {
  //     this.scheduleFullDayByHours = [];

  //     const start = 'currentTime' === this.type ? this.daySchedule.findIndex((item) => item && item.length) : 1;

  //     if (-1 === start) {
  //       return;
  //     }
  //     if (this.hours$) {
  //       this.hours$.unsubscribe();
  //     }
  //     range(start, (24 - start + 1)).subscribe((hour) => {
  //       this.scheduleFullDayByHours.push({
  //         hour: 24 === hour ? 0 : hour,
  //         routes: this.daySchedule[hour] || []
  //       });
  //     });
  //   }
  // }

  ngOnChanges(change) {
    // debugger
    if (change.daySchedule) {
      // debugger
    }
  }
}
