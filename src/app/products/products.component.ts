import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  constructor(private _ProductsService: ProductsService) {
    _ProductsService.getAllProducts().subscribe((data) => {
      this.products = data;
    });
  }
  ngOnInit(): void {}
}
