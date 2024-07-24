import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ProductsService } from '../../products.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditProductComponent } from '../edit-product/edit-product.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent implements OnInit, AfterViewInit {
  @ViewChild(EditProductComponent)
  editProdChild!: EditProductComponent;
  products: any[] = [];
  productsCat: any[] = [];
  slectedCategory: string = '';
  range: any;
  sorter: any;
  idProduct: string = '';
  doneDelete: string = '';
  onEdit = false;
  onAdd = false;
  prdToEdit: any;
  sentPrd: any;

  constructor(
    private _ProductsService: ProductsService,
    private fb: FormBuilder
  ) {}
  ngAfterViewInit(): void {}

  sendProduct(prd: any) {
    this.prdToEdit = prd;
  }

  edit() {
    this.onEdit = true;
    this.onAdd = false;
  }
  add() {
    this.onAdd = true;
    this.onEdit = false;
  }

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

    this._ProductsService.currentCategory.subscribe((data) => {
      this.slectedCategory = data;
      this._ProductsService
        .getProductsByCategory(this.slectedCategory)
        .subscribe((data) => {
          this.products = data;
        });
    });
  }

  itemDel(id: any) {
    this.idProduct = id.target.value;
    this._ProductsService
      .deleteProduct(this.idProduct)
      .subscribe((response) => {
        this.doneDelete = response;
        // alert(this.idProduct);
      });
  }
}
