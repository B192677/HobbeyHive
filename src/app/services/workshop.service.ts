import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Workshop } from '../models/workshop';

@Injectable({
  providedIn: 'root'
})
export class WorkshopService {

  private baseUrl = 'http://localhost:8080/api/workshops';

  constructor(private http: HttpClient) {}

  /**
   * Get single workshop by ID
   * Converts backend image path to full URL
   */
  getWorkshopById(id: number): Observable<Workshop> {
    return this.http.get<Workshop>(`${this.baseUrl}/${id}`).pipe(
      map(workshop => {
        if (workshop.image) {
          // If backend returns path like "/images/painting.jpg"
          if (workshop.image.startsWith('/images/')) {
            workshop.imageUrl = `http://localhost:8080${workshop.image}`;
          } else {
            // fallback for filename only
            workshop.imageUrl = `http://localhost:8080/images/${workshop.image}`;
          }
        } else {
          // fallback placeholder if image missing
          workshop.imageUrl = 'assets/images/placeholder.png';
        }
        return workshop;
      })
    );
  }

  /**
   * Get all workshops
   * Converts backend image paths to full URLs
   */
  getAllWorkshops(): Observable<Workshop[]> {
    return this.http.get<Workshop[]>(this.baseUrl).pipe(
      map(workshops => workshops.map(w => {
        if (w.image) {
          if (w.image.startsWith('/images/')) {
            w.imageUrl = `http://localhost:8080${w.image}`;
          } else {
            w.imageUrl = `http://localhost:8080/images/${w.image}`;
          }
        } else {
          w.imageUrl = 'assets/images/placeholder.png';
        }
        return w;
      }))
    );
  }
}
