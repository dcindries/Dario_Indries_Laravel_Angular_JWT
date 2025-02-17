import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  name?: string;
  email: string;
  password: string;
  password_confirmation?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  register(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  signin(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, user);
  }

  profileUser(): Observable<any> {
    return this.http.get(`${this.baseUrl}/me`);
  }
}
