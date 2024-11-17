import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  API: string = 'http://localhost:3000/api/restaurants';
  API_DISHES: string = 'http://localhost:3000/api/dishes';

  constructor(private http: HttpClient) {}

  public getRestaurants(): Observable<any> {
    return this.http.get<any[]>(`${this.API}`);
  }

  public deleteRestaurant(id:number): Observable<any> {
    return this.http.put<any>(`${this.API}/logical-delete/${id}`,{});
  }

  public insertRestaurant(data:any): Observable<any> {
    return this.http.post<any>(`${this.API}`,data);
  }

  public putRestaurant(data:any,id:number): Observable<any> {
    return this.http.put<any>(`${this.API}/${id}`,data);
  }

  public findDishesByRestaurant(id:number): Observable<any> {
    return this.http.get<any>(`${this.API_DISHES}/${id}`);
  }

  public deleteDishes(id:number,dishes:any): Observable<any> {
    return this.http.put<any>(`${this.API_DISHES}/logical-delete/${id}`,dishes);
  }

  public updateDishes(id:number,dishes:any): Observable<any> {
    return this.http.put<any>(`${this.API_DISHES}/${id}`,dishes);
  }

  public insertDishes(dishes:any): Observable<any> {
    return this.http.post<any>(`${this.API_DISHES}`,dishes);
  }
}
