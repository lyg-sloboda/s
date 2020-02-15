import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  toggler$ = new BehaviorSubject<boolean>(false);

  constructor() {}

  show() {
    this.toggler$.next(true);
    return this.toggler$;
  }
  hide() {
    this.toggler$.next(false);
    return this.toggler$;
  }
}
