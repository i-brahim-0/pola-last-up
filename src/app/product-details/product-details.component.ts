import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  id: string = '';
  productDetails: any = {};
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _ProductsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.id = this._ActivatedRoute.snapshot.params['id'];
    this._ProductsService.getSingleProduct(this.id).subscribe((data) => {
      this.productDetails = data;
    });
  }
}
