import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {BehaviorSubject, throwError} from 'rxjs';
import {TokenService} from './token.service';
import {catchError, filter, map, retry, switchMap, take} from 'rxjs/operators';
import {AuthService} from './auth.service';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor(
    private router: Router,
    private tokenService: TokenService,
    private authService: AuthService,
    private http: HttpClient) {
  }
  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): any {

    const token = this.tokenService.getToken();
    const refreshToken = this.tokenService.getRefreshToken();
    console.log('Http Interceptor now');
    if (token) {
      request = this.addToken(request, token);
    }

    if (!request.headers.has('Content-Type')) {
      request = request.clone({
        setHeaders: {
          Accept : 'application/json'
        }
      });
    }

    request = request.clone({
      headers: request.headers.set('Accept', 'application/json')
    });
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log('Receive event:', event);
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        if ( error.url && error?.url?.indexOf('/auth/oauth2/v1/token') < 0 && error.status === 401)
        {
          if (error.statusText === 'Unauthorized')
          {
              if (!this.isRefreshing)
              {
                this.isRefreshing = true;
                this.refreshTokenSubject.next(null);
                return this.authService.refreshToken({refresh_token: refreshToken}).pipe(
                  switchMap((token: any) => {
                    this.isRefreshing = false;
                    this.refreshTokenSubject.next(token.access_token);
                    return next.handle(this.addToken(request, token.access_token));
                  }));
              }else
              {
                return this.refreshTokenSubject.pipe(
                  filter(token => token != null),
                  take(1),
                  switchMap(rdpToken => {
                    return next.handle(this.addToken(request, rdpToken.access_token));
                  }));
              }
          } else {
            this.router.navigate(['login']).then(_ => console.log('redirect to login'));
          }
        }
        else if ( error.status === 403 )
        {
          this.router.navigate(['login']).then(_ => console.log('redirect to login'));
        }
        console.log('ThrowError>>>>', error);
        return throwError(error);
      }));
  }
}
