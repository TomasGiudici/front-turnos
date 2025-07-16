import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TurnoService {
  private apiUrl = `${environment.apiUrl}/appointments`;

  constructor(private http: HttpClient) {}

  getDisponibles(date: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/available?date=${date}`);
  }

  reservarTurno(date: string, time: string): Observable<any> {
    return this.http.post(this.apiUrl, { date, time });
  }

  getMisTurnos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/my`);
  }

  cancelarTurno(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
