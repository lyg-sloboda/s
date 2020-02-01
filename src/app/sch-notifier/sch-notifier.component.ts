import { Component, OnInit } from '@angular/core';
import { CacheService } from '../shared/services/cache/cache.service';

@Component({
  selector: 'sch-notifier',
  templateUrl: './sch-notifier.component.html',
  styleUrls: ['./sch-notifier.component.scss']
})
export class SchNotifierComponent implements OnInit {
  closed: boolean = false;

  CACHE_KEY = 'GLOBAL_NOTIFICATION';
  CACHE_VALUE = 1;

  constructor(private cache: CacheService) {
    const cacheValue = this.cache.get(this.CACHE_KEY);

    // if notifier was closed priveously
    if (cacheValue === this.CACHE_VALUE)
      this.closed = true;
  }

  ngOnInit() {
  }

  close() {
    this.closed = true;
    this.cache.save(this.CACHE_KEY, this.CACHE_VALUE);
  }

}
