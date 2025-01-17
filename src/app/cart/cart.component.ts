import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnChanges {
  myCart: any[] = [];
  totalPrice = 0;

  constructor(private _CartService: CartService) {
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

  changeQuantity() {
    localStorage.setItem('myCart', JSON.stringify(this.myCart));
    this.getTotalPrice();
  }

  removeItemCart(id: number) {
    this.myCart.splice(id, 1);
    localStorage.setItem('myCart', JSON.stringify(this.myCart));
    this.getTotalPrice();
  }

  getTotalPrice() {
    this.totalPrice = 0;
    for (let x in this.myCart) {
      this.totalPrice += this.myCart[x].item.price * this.myCart[x].quantity;
    }
  }

  addOrder() {
    let products = this.myCart.map((item) => {
      return [{ productId: item.item.id, quantity: item.quantity }];
    });
    let model = {
      userId: '3',
      date: new Date(),
      products: products,
    };
    this._CartService.addCart(model).subscribe(() => {
      alert('Done Created New Cart');
    });
  }
}
