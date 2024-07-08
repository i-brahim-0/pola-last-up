import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
HttpClient;

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private _HttpClient: HttpClient) {}
  getAllProducts(): Observable<any> {
    return this._HttpClient.get('https://fakestoreapi.com/products');
  }
}
