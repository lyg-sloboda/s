import { Injectable, isDevMode } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const cacher = isDevMode() ? 'http://localhost/030_schedule_3/cache' : 'http://modulzabor.by/lyg-sloboda';
    const encodedUrl = encodeURIComponent( req.urlWithParams );

    return next.handle(req.clone({
      url: cacher,
      params: new HttpParams({
        fromObject: {
          proxy: encodedUrl
        }
      })
    }))
      .pipe(
        map(responce => {
          if (!responce['body']) {
            return responce;
          }
          responce['body'] = responce['body'].data || responce['body'];

          return responce;
        })
      );
  }
}
