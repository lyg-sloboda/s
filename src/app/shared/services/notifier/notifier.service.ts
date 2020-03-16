import { Injectable } from '@angular/core';
import { CacheService } from '../cache/cache.service';
import { RootModalService } from '../root-modal/root-modal.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotifierService {
  APP_INTRODUCTION = {
    key: 'APP_INTRODUCTION',
    value: 1
  }

  SCHEDULE_ALERT = {
    key: 'SCHEDULE_INTRODUCTION',
    value: 'SCHEDULE_INTRODUCTION'
  }

  alert$ = new BehaviorSubject<boolean>(null);

  constructor(
    private cache: CacheService,
    private rootModalService: RootModalService
  ) { }

  openAnyModalOnLoad() {
    if (this.isShowIntroduction()) {
      this.rootModalService.showNext(this.APP_INTRODUCTION.key);
    }
    if (this.isShowAlert()) {
      this.alert$.next(true);
    }
  }

  private isShowIntroduction() {
    return this.inCache(this.APP_INTRODUCTION);
  }

  openScheduleIntro() {
    this.rootModalService.showNext(this.SCHEDULE_ALERT.key);
  }

  checkReadAlert() {
    this.cache.save(this.SCHEDULE_ALERT.key, this.SCHEDULE_ALERT.value);
    this.alert$.next(null);
    this.rootModalService.hide(this.SCHEDULE_ALERT.key);
  }

  checkReadIntroduction() {
    this.cache.save(this.APP_INTRODUCTION.key, this.APP_INTRODUCTION.value);
    this.rootModalService.hide(this.APP_INTRODUCTION.key);
  }

  isShowAlert() {
    return this.inCache(this.SCHEDULE_ALERT);
  }

  private inCache(attr) {
    const cacheValue = this.cache.get(attr.key);

    // if notifier was closed priveously
    return cacheValue !== attr.value;
  }
}
