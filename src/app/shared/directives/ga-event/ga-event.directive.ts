import { Directive, Input, HostListener, Attribute } from '@angular/core';
import { AppGaEvent, AnalyticsService } from '../../services/analytics/analytics.service';

@Directive({
  selector: '[gaEvent]'
})
export class GaEventDirective {
  @Input() gaEvent: AppGaEvent;
  @HostListener('click', ['$event.target'])
  onClick(target) {
    if (this.gaEvent) {
      this.analytics.trackEvent(this.gaEvent);
    }
  }

  constructor(
    private analytics: AnalyticsService
  ) { }
}
