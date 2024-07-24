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
  range: any;
  sorter: any;
  // myCategoryFromRout: string = '';
  sub: any;

  constructor(
    private _ProductsService: ProductsService // private _ActivatedRoute: ActivatedRoute
  ) {
    // this.myCategoryFromRout = this._ActivatedRoute.snapshot.params['cat'];
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
