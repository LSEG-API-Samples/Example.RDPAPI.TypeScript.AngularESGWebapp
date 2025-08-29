import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {TokenService} from './token.service';


const API_URL = 'http://localhost:4200/';
const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'application/json',
    AllowAutoRedirect: 'false'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  redirectUrl = '';

  private static handleError(error: HttpErrorResponse): any {

    console.error('An error occurred:', error);

    return throwError(
      error);
  }

  private static log(message: string): any {
    console.log(message);
  }

  constructor(private http: HttpClient, private tokenService: TokenService) {
  }

  login(loginData: any): Observable<any> {

    this.tokenService.removeToken();
    this.tokenService.removeRefreshToken();



    const body = new HttpParams()
      .set('username', loginData.username)
      .set('password', loginData.password)
      .set('grant_type', 'password')
      .set('scope', 'trapi')
      .set('takeExclusiveSignOnControl', 'true')
      .set('client_id', loginData.appkey);


    return this.http.post<any>(API_URL + 'rdpapi/auth/oauth2/v1/token', body.toString(), HTTP_OPTIONS)
      .pipe(
        tap(res => {
          this.tokenService.saveToken(res.access_token);
          this.tokenService.saveRefreshToken(res.refresh_token);
          this.tokenService.saveUsername(loginData.username);
          this.tokenService.saveAppKey(loginData.appkey);
        }),
        catchError(AuthService.handleError)
      );
  }

  refreshToken(refreshData: any): Observable<any> {
    this.tokenService.removeToken();
    this.tokenService.removeRefreshToken();
    const body = new HttpParams()
      .set('refresh_token', refreshData.refresh_token)
      .set('grant_type', 'refresh_token')
      .set('username', this.tokenService.getUsername() as string)
      .set('client_id', this.tokenService.getAppKey() as string);
    return this.http.post<any>(API_URL + 'rdpapi/auth/oauth2/v1/token', body.toString(), HTTP_OPTIONS)
      .pipe(
        tap(res => {
          console.log('Save a new token to local storage');
          this.tokenService.saveToken(res.access_token);
          this.tokenService.saveRefreshToken(res.refresh_token);
        }),
        catchError(AuthService.handleError)
      );
  }

  logout(): void {
    this.tokenService.removeToken();
    this.tokenService.removeRefreshToken();
    this.tokenService.removeUsername();
  }


}
