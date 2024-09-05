import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RegisterIntake } from '../interfaces/register-intake';
import { RegisterIntakeResponse } from '../interfaces/register-intake-response';

@Injectable({
  providedIn: 'root'
})
export class WaterTrackingService {

  http = inject(HttpClient);

  baseUrl: string = 'http://localhost:8000/water_tracking';

  registerIntake(intake: RegisterIntake): Observable<RegisterIntakeResponse> {
    return this.http.post<RegisterIntakeResponse>(`${this.baseUrl}/register-intake/`, intake);
  }

  getDailyProgress(id: number) {
    return this.http.get(`${this.baseUrl}/daily-progress/${id}/`)
  }

  getTrackingHistory(id: number) {
    return this.http.get(`${this.baseUrl}/intake-history/${id}/`)
  }

}
