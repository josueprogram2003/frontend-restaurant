import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  API: string = 'localhost:3000/api/restaurant';

  constructor(private http: HttpClient) {}

  public getRestaurants(): Observable<any> {
    return this.http.get(`${this.API}`);
  }
}
