import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../Domains/api.model';
import { ApiHelper } from '../Helpers/apiHelper.component';
import { RootObject } from '../Domains/city.model';

@Injectable({
  providedIn: 'root',
})
export class ResponseService {
  public qs: Array<[string, string]> = [];

  constructor(private http: HttpClient, private apiHelper: ApiHelper) {}

  public getResponse(): Observable<ApiResponse[]> {
    const baseurl = 'https://safar724.com/bus/getservices';
    let res = this.apiHelper.Get(baseurl, this.qs);
    return this.http.get<ApiResponse[]>(res);
  }

  public getCitiesList(): Observable<RootObject[]> {
    const url = 'https://safar724.com/route/getcities';
    return this.http.get<RootObject[]>(url);
  }
}
