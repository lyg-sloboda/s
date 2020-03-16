import { Component, OnInit } from '@angular/core';
import { CacheService } from 'src/app/shared/services/cache/cache.service';
import { Observable } from 'rxjs';
import { RootModalService } from 'src/app/shared/services/root-modal/root-modal.service';

@Component({
  selector: 'sch-root-modal',
  templateUrl: './root-modal.component.html',
  styleUrls: ['./root-modal.component.scss']
})
export class RootModalComponent implements OnInit {
  modalName$: Observable<string>;
  constructor(private rootModalService: RootModalService) { }

  ngOnInit() {
    this.modalName$ = this.rootModalService.modal$;
  }

}
