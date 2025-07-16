import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  login(data: {email: string, password: string}) {
    return this.http.post(`${this.apiUrl}/login`, data)
    .pipe(tap((res: any) => {
      localStorage.setItem('token', res.access_token);
    }));
  }

  register(data: { name: string; email: string; password: string }) {
    return this.http.post(`${this.apiUrl}/register`, data)
    .pipe(tap((res: any) => {
      localStorage.setItem('token', res.access_token);
    }));
  }
}
