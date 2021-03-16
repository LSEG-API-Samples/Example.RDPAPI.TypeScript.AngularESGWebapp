import { Injectable } from '@angular/core';

const ACCESS_TOKEN = 'access_token';
const REFRESH_TOKEN = 'refresh_token';
const USER_NAME = 'username';
const APP_KEY = '';
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  getToken(): string|null {
    return localStorage.getItem(ACCESS_TOKEN);
  }
  getAppKey(): string|null{
    return localStorage.getItem(APP_KEY);
  }
  getRefreshToken(): string|null {
    return localStorage.getItem(REFRESH_TOKEN);
  }

  getUsername(): string|null{
    return localStorage.getItem(USER_NAME);
  }

  saveToken(token: string): void {
    localStorage.setItem(ACCESS_TOKEN, token);
  }
  saveAppKey(appKey: string): void{
    localStorage.setItem(APP_KEY, appKey );
  }
  saveRefreshToken(refreshToken: string): void {
    localStorage.setItem(REFRESH_TOKEN, refreshToken);
  }
  saveUsername(username: string): void {
    localStorage.setItem(USER_NAME, username);
  }
  removeToken(): void {
    localStorage.removeItem(ACCESS_TOKEN);
  }
  removeUsername(): void {
    localStorage.removeItem(USER_NAME);
  }
  removeRefreshToken(): void {
    localStorage.removeItem(REFRESH_TOKEN);
  }
}
