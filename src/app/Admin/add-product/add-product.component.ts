import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../../products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent {
  addProductForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _ProductsService: ProductsService
  ) {
    this.addProductForm = this.fb.group({
      productName: ['', [Validators.required]],
      category: [''],
      price: ['', [Validators.required]],
      description: [''],
      image: [''],
    });
  }
  onSubmit() {
    this._ProductsService
      .addPoduct(this.addProductForm.value)
      .subscribe((response) => {
        alert(response.id);
      });
    console.log('Form Value', this.addProductForm.value);
  }
}
