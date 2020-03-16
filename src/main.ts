import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
// import * from './app/utils/yandex-metrika';

if (environment.production) {
  enableProdMode();
  window['ym'](61007164, "init", {
    clickmap: true,
    trackLinks: true,

    accurateTrackBounce: true,
    webvisor: true
  });
  window['gtag']('config', 'UA-47179291-4');
}
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
