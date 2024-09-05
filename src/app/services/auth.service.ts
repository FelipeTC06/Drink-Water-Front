import { UserRegister } from './../interfaces/user-register.interface';
import { UserLogin } from './../interfaces/user-login.interface';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthUserResponse } from '../interfaces/authUser.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient);

  baseUrl: string = 'https://drink-water-api.onrender.com/user_auth';

  register(user: UserRegister): Observable<AuthUserResponse> {
    return this.http.post<AuthUserResponse>(`${this.baseUrl}/register`, user);
  }

  login(user: UserLogin): Observable<AuthUserResponse> {
    return this.http.post<AuthUserResponse>(`${this.baseUrl}/login`, user);
  }
}
