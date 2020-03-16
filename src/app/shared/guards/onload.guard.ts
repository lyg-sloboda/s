import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { NotifierService } from '../services/notifier/notifier.service';

// https://metanit.com/web/angular2/7.7.php
@Injectable()
export class OnLoadGuard implements CanActivate {
  constructor(
    private notifierService: NotifierService
  ) { }

  canActivate(): boolean {
    this.notifierService.openAnyModalOnLoad();

    return true;
  }
}
