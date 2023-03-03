import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiHelper {
  constructor() {}

  public Get(url: string, qs: [string, string][]): string {
    var queryString = '/?';
    qs.forEach((q) => {
      queryString += q[0] + '=' + q[1] + '&';
    });
    if (qs.length > 0) {
      url = url + queryString;
    }

    return url;
  }
}
