import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkshopService {

  private baseUrl = 'http://localhost:8080/api/workshops';

  constructor(private http: HttpClient) {}

  getWorkshopById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  getAllWorkshops(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }
}
