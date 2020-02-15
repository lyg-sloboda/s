import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { SpinnerService } from './shared/services/spinner/spinner.service';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  spinnerToggler$: Observable<boolean>;
  constructor(private spinnerService: SpinnerService, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.spinnerToggler$ = this.spinnerService.toggler$;
  }

}
