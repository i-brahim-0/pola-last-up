import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../../products.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent {
  @Input() action: string = '';
  @Input() editPrd: any;
  addProductForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _ProductsService: ProductsService
  ) {
    this.addProductForm = this.fb.group({
      title: ['', [Validators.required]],
      category: [''],
      price: ['', [Validators.required]],
      description: [''],
      image: [''],
    });
    // this.editProduct(this.editPrd);
  }
  onSubmit() {
    this._ProductsService
      .addPoduct(this.addProductForm.value)
      .subscribe((response) => {
        alert(response.id);
      });
    console.log('New Product is : ', this.addProductForm.value);
  }
}
