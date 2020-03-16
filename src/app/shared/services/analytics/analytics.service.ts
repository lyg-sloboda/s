import { Injectable } from '@angular/core';

const ga = window['ga'] || ((...args) => { console.log(args)});

export type AppGaEvent = 'minsk' | 'sloboda' | 'info' | 'allSchedule' | 'nowSchedule' | 'carousel';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor() { }

  trackEvent(name: AppGaEvent) {
    ga('send', 'event', name);
  }
  trackCarousel(type: string, button: 'previous' | 'next' | 'close', slide: number) {
    ga('send', 'event', 'carousel', type, button, `click-on-${slide}`);
  }
}
