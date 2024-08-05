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
  totalPrice = 0;

  constructor() {
    this.getCatr();
  }

  ngOnInit(): void {}
  ngOnChanges(): void {}

  addQuantity(index: number) {
    this.myCart[index].quantity++;
    this.getTotalPrice();
    localStorage.setItem('myCart', JSON.stringify(this.myCart));
  }
  minQuantity(index: any) {
    this.myCart[index].quantity--;
    this.getTotalPrice();
    localStorage.setItem('myCart', JSON.stringify(this.myCart));
  }

  getCatr() {
    if ('myCart' in localStorage) {
      this.myCart = JSON.parse(localStorage.getItem('myCart')!);
    }
    this.getTotalPrice();
  }
  removeItemCart(id: number) {
    alert(id);
  }

  getTotalPrice() {
    this.totalPrice = 0;
    for (let x in this.myCart) {
      this.totalPrice += this.myCart[x].item.price * this.myCart[x].quantity;
    }
  }
}
