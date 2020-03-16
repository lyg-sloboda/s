import { Component, Input, Output, ContentChildren, QueryList, EventEmitter, OnInit, ChangeDetectionStrategy, AfterContentInit } from '@angular/core';
import { CarouselSlideComponent } from '../carousel-slide/carousel-slide.component';
import { Observable, interval, timer } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { AnalyticsService } from 'src/app/shared/services/analytics/analytics.service';

@Component({
  selector: 'sch-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarouselComponent implements OnInit, AfterContentInit {
  @Input() closeButton: boolean | string;
  @Input() type: string;

  @Output() closed = new EventEmitter();

  @ContentChildren(CarouselSlideComponent) slides: QueryList<CarouselSlideComponent>;

  current = 0;
  showCloseBtn = false;
  closeBtnTitle = 'Закрыть';

  timer$: Observable<undefined[]>;

  defaultTimerSeconds = 5;
  timerSeconds: number;

  constructor(private analytics: AnalyticsService) {

  }

  ngOnInit() {
    this.showCloseBtn = !!this.closeButton;
    if ('string' === typeof this.closeButton) {
      this.closeBtnTitle = this.closeButton;
    }
  }

  ngAfterContentInit() {
    // debugger
    this.setTimer();

  }

  prev() {
    this.analytics.trackCarousel( this.type, 'previous', this.current + 1);
    this.current--;
    this.setTimer();
  }

  next() {
    this.current++;
    this.analytics.trackCarousel( this.type, 'next', this.current);
    this.setTimer();
  }

  setTimer() {
    const timer = this.slides.toArray()[this.current].timer;
    this.timerSeconds = timer ? +timer : this.defaultTimerSeconds;
    this.startTimer();
  }

  private startTimer() {
    this.timer$ = timer(0, 1000)
      .pipe(
        take(this.timerSeconds + 1),
        map((val) => {
          return new Array(this.timerSeconds - val)
        })
      )
  }

  close() {
    this.closed.next();
    this.analytics.trackCarousel( this.type, 'close', this.current + 1);
  }
}
