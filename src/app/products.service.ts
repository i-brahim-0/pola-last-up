import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService implements OnInit {
  private isCategory = new Subject<any>();
  currentCategory = this.isCategory.asObservable();

  constructor(private _HttpClient: HttpClient) {}

  ngOnInit(): void {}

  storCategory(data: any) {
    this.isCategory.next(data);
  }

  getAllProducts(): Observable<any> {
    return this._HttpClient.get('https://fakestoreapi.com/products');
  }

  getSingleProduct(id: string): Observable<any> {
    return this._HttpClient.get('https://fakestoreapi.com/products/' + id);
  }

  getAllCategories(): Observable<any> {
    return this._HttpClient.get('https://fakestoreapi.com/products/categories');
  }

  getProductsByCategory(category?: string): Observable<any> {
    return this._HttpClient.get(
      'https://fakestoreapi.com/products/category/' + category
    );
  }

  getLimit(range?: any): Observable<any> {
    return this._HttpClient.get(
      'https://fakestoreapi.com/products?limit=' + range
    );
  }

  getSortBy(val?: any): Observable<any> {
    return this._HttpClient.get(
      'https://fakestoreapi.com/products?sort=' + val
    );
  }

  addPoduct(formData: any): Observable<any> {
    return this._HttpClient.post('https://fakestoreapi.com/products', formData);
  }

  deleteProduct(id: string): Observable<any> {
    return this._HttpClient.delete('https://fakestoreapi.com/products/' + id);
  }
}
