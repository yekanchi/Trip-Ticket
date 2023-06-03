import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../Domains/api.model';
import { RootObject } from '../Domains/city.model';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  constructor(private http: HttpClient) {}

  public getCityUrl(
    origin: string,
    destination: string,
    date: string
  ): Observable<ApiResponse> {
    const baseurl = `https://safar724.com/bus/getservices/?origin=${origin}&destination=${destination}&date=${date}`;
    return this.http.get<ApiResponse>(baseurl);
  }

  public getCitiesList(): Observable<RootObject[]> {
    const url = 'https://safar724.com/route/getcities';
    return this.http.get<RootObject[]>(url);
  }
}
