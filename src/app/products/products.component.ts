import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ProductsService } from '../products.service';

// import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnChanges, OnDestroy {
  products: any[] = [];
  productsCat: any[] = [];
  slectedCategory: string = '';
  categoris: any[] = [];
  range: any;
  sorter: any;
  // myCategoryFromRout: string = '';
  sub: any;
  cartProducts: any[] = [];
  count = 1;
  addBtn = false;

  catego = '';

  constructor(
    private _ProductsService: ProductsService // private _ActivatedRoute: ActivatedRoute
  ) {
    // this.myCategoryFromRout = this._ActivatedRoute.snapshot.params['cat'];
    _ProductsService.getAllCategories().subscribe((data) => {
      this.categoris = data;
    });

    this.getAllPrd();
  }
  ngOnChanges(): void {}

  getRange(numb: any) {
    this.range = numb.target.value;
    this._ProductsService.getLimit(this.range).subscribe((data) => {
      this.products = data;
    });
  }
  getSorter(numb: any) {
    this.sorter = numb.target.value;
    this._ProductsService.getSortBy(this.sorter).subscribe((data) => {
      this.products = data.slice(0, this.range);
    });
  }

  ngOnInit(): void {
    // this._ProductsService
    //   .getProductsByCategory(this.myCategoryFromRout)
    //   .subscribe((data) => {
    //     this.products = data;
    //   });
  }

  getAllPrd() {
    this._ProductsService.getAllProducts().subscribe((data) => {
      this.products = data;
    });
  }

  selectCategory(cat: any) {
    this.catego = cat.target.value;
    this.getPrdByCat();
  }
  getPrdByCat() {
    if (this.catego == 'all') {
      this.getAllPrd();
    } else {
      this._ProductsService
        .getProductsByCategory(this.catego)
        .subscribe((data) => {
          this.products = data;
        });
    }
  }

  addToCatr(item: any) {
    if ('myCart' in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem('myCart')!);
      let exist = this.cartProducts.find((prd) => prd.item.id == item.id);
      if (exist) {
        alert('this product in cart alredy');
        // this.cartProducts.pop();
        // localStorage.removeItem(item.id);
        // this.quntit++;
        // this.cartProducts.push({ item, quantity: this.quntit });
        // localStorage.setItem('myCart', JSON.stringify(this.cartProducts));
      } else {
        // this.quntit = 1;
        this.cartProducts.push({ item, quantity: this.count });
        localStorage.setItem('myCart', JSON.stringify(this.cartProducts));
      }
    } else {
      // this.quntit = 1;
      this.cartProducts.push({ item, quantity: this.count });
      localStorage.setItem('myCart', JSON.stringify(this.cartProducts));
    }
  }

  ngOnDestroy(): void {
    // this.sub.unsubscribe();
  }
}
