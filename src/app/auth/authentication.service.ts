import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private host = environment.apiUrl;
  private token: any;
  private loggedInUserName: any;
  private jwtHelper = new JwtHelperService();
  
  constructor(private http: HttpClient) {}

  public login(user: User): Observable<HttpResponse<any> | HttpErrorResponse> {
      return this.http.post<HttpResponse<any> | HttpErrorResponse>
      (`${this.host}/user/login`, user, {observe: 'response'});
  }


  public register(user: User): Observable<User | HttpErrorResponse> {
    return this.http.post<User | HttpErrorResponse>
    (`${this.host}/user/login`, user);
  }

  public logout(): void {
   this.token = null;
   this.loggedInUserName = null;
   localStorage.removeItem('user');
   localStorage.removeItem('token');
   localStorage.removeItem('users');
  }

  public saveToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  public addUserToLocalCache(user: User): void {
    localStorage.setItem('user',JSON.stringify(user));
  }

  public getUserFromLocalCache(): User {
    return JSON.parse(localStorage.getItem("user") || '{}');
  }

  public loadToken(): void {
    this.token = localStorage.getItem('token');
  }

  public getToken(): string {
    return this.token;
  }

  public isLoggedIn(): boolean {
    this.loadToken();
    if (this.token != null && this.token !== '') {
      if (this.jwtHelper.decodeToken(this.token).sub != null || '') {
        if(!this.jwtHelper.isTokenExpired(this.token)) {
          this.loggedInUserName = this.jwtHelper.decodeToken(this.token).sub;
          return true;
        }
      }

    } else {
      this.logout();
      return false;
    }
    return false;
  }



}
