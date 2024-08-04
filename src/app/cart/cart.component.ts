import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from '../products.service';
import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnChanges {
  myCart: any[] = [];

  constructor(private _ProductsService: ProductsService) {
    this.getCatr();
  }

  ngOnInit(): void {}
  ngOnChanges(): void {}

  getCatr() {
    if ('myCart' in localStorage) {
      this.myCart = JSON.parse(localStorage.getItem('myCart')!);
    } else {
    }
    // console.log(this.myCart);
  }
}
