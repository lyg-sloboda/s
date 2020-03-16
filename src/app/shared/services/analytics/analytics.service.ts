import { Injectable } from '@angular/core';

let ga: Function;

export type AppGaEvent = 'minsk' | 'sloboda' | 'info' | 'allSchedule' | 'nowSchedule' | 'carousel';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor() {
    // ga = window['ga'] || ((...args) => { console.log(args) });
  }

  trackEvent(name: AppGaEvent) {
    window['gtag']('event', name);
  }
  trackCarousel(type: string, button: 'previous' | 'next' | 'close', slide: number) {
    window['gtag']('event', 'carousel', {
      event_category: type,
      event_label: button,
      value: `click-on-${slide}`
    });
  }

  trackPageNavigation(page: string) {
    window['gtag']('config', 'UA-47179291-4', { 'page_path': page });
  }
}
