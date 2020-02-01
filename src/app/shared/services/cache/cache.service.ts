import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private UPDATE_TIME_KEY = 'UPDATE_TIME';

  storage = window.localStorage;

  isEmptyCache = true;

  _getUpdateTimeKey(key) {
    return `${key}_${this.UPDATE_TIME_KEY}`
  }

  constructor() {}

  schedueInCache(key) {
    if ( ! environment.enableCache ) {
      return false;
    }
    return (new Date()).getTime() < +this.get(this._getUpdateTimeKey(key));
  }

  setSchedule(key, data) {
    const newUpdateTime = new Date();
    newUpdateTime.setHours(23, 59, 59);

    this.save(key, data)
    this._saveStorageItem(this._getUpdateTimeKey(key), newUpdateTime.getTime());
  }

  save(key, data) {
    data = JSON.stringify(data);
    this._saveStorageItem(key, data);
  }

  _saveStorageItem(key, value) {
    this.storage.setItem(key, value);
  }
  _getStorageItem(key) {
    return this.storage.getItem(key);
  }
  get(key): any {
    const val = this._getStorageItem(key);
    try {
      return JSON.parse(val);
    } catch (e) {
      return val;
    }
  }

  clearAll() {
    this.storage.clear();
  }
}
