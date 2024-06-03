import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CovidService {
  private baseUrl = 'https://api.covidtracking.com/v1/states';

  constructor(private http: HttpClient) { }

  getDailyData(state: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${state}/daily.json`);
  }
}
