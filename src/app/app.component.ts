import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { RootModalService } from './shared/services/root-modal/root-modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  showModal$: Observable<string>;
  constructor(
    private rootModalService: RootModalService
  ) {}

  ngOnInit() {
    this.showModal$ = this.rootModalService.modal$;
  }

}
