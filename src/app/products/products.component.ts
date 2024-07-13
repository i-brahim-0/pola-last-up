import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
// import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: any[] = [];
  productsCat: any[] = [];
  slectedCategory: string = '';
  // myCategoryFromRout: string = '';
  sub: any;

  constructor(
    private _ProductsService: ProductsService
  ) // private _ActivatedRoute: ActivatedRoute
  {
    // this.myCategoryFromRout = this._ActivatedRoute.snapshot.params['cat'];
  }

  ngOnInit(): void {
    this._ProductsService.getAllProducts().subscribe((data) => {
      this.products = data;
    });

    this.sub = this._ProductsService.currentCategory.subscribe((data) => {
      this.slectedCategory = data;
      this._ProductsService
        .getProductsByCategory(this.slectedCategory)
        .subscribe((data) => {
          this.products = data;
        });
    });

    // this._ProductsService
    //   .getProductsByCategory(this.myCategoryFromRout)
    //   .subscribe((data) => {
    //     this.products = data;
    //   });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
