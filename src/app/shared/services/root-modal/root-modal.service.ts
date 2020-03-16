import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// export enum ROOT_MODALS {
//   spinner = 'spinner';
//   introuduction = 'introduction';
// }

@Injectable({
  providedIn: 'root'
})
export class RootModalService {
  readonly modal$ = new BehaviorSubject<string>(null);

  stack = new Set<string>();

  constructor() { }

  hide(name) {
    this.stack.delete(name);

    // open next modal
    if (name === this.modal$.getValue()) {
      this.modal$.next([...this.stack][0]);
    }

  }

  showNext(name) {
    if (this.stack.has(name)) {
      return;
    }

    if (0 === [...this.stack].length) {
      this.modal$.next(name);
    }

    this.stack.add(name);
  }
}
