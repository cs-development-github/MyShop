import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  private URL_PATH = "/products"

  constructor(
    private _http: HttpClient
  ) { }

  getAllProducts(): Observable<any> {
    return this._http.get(environment.url + this.URL_PATH + "?limit=10");
  }

  getSkipProduct(skip: number): Observable<any> {
    return this._http.get(`${environment.url}${this.URL_PATH}?limit=10&skip=${skip}`);
  }
}
