import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';

const API_URL = 'http://localhost:4200/';
@Injectable({
  providedIn: 'root'
})
export class EsgService {

  constructor(private http: HttpClient) { }
  private static handleError(error: HttpErrorResponse): any {
    console.error('An error occurred:', error);
    return throwError(
      error);
  }

  searchEsg(universe: string): Observable<any>{
    return this.http.get(API_URL + 'rdpapi/data/environmental-social-governance/v2/views/basic?universe=' + universe)
      .pipe(catchError(EsgService.handleError));
  }
}
