import { Component, OnInit } from '@angular/core';
import { CacheService } from '../shared/services/cache/cache.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {

  constructor(private cache: CacheService) {
    this.cache.clearAll();
  }

  ngOnInit() {

  }

}
