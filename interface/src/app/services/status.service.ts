import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class StatusService {

  constructor(private http: Http) { }

  getStatus() {
    const ep = 'api/status';
    return this.http.get(ep)
      .map(res => res.json());
  }
  setStatus(status) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const ep = 'api/status';
    return this.http.post(ep, status, { headers: headers })
      .map(res => res.json());
  }
}
