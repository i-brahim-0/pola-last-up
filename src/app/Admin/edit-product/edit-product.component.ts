import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../../products.service';
import { Component, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit, OnChanges {
  @Input() prdToEdit: any;
  @Input() idPrd: any;

  editProductForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _ProductsService: ProductsService
  ) {
    this.editProductForm = this.fb.group({
      title: ['', [Validators.required]],
      category: [''],
      price: ['', [Validators.required]],
      description: [''],
      image: [''],
    });
  }

  ngOnChanges(): void {
    // console.log(this.idPrd);
    this.editProductForm.patchValue({
      title: this.prdToEdit.title,
      category: this.prdToEdit.category,
      price: this.prdToEdit.price,
      description: this.prdToEdit.description,
      // image:this.prdToEdit.image,
    });

    this.onSubmit();

    // OR >>

    // this.editProductForm.get('title')?.setValue(this.prdToEdit.title);
    // this.editProductForm.get('price')?.setValue(this.prdToEdit.price);
    // this.editProductForm.get('category')?.setValue(this.prdToEdit.category);
    // this.editProductForm
    //   .get('description')
    //   ?.setValue(this.prdToEdit.description);
    // this.editProductForm.get('image')?.setValue(this.prdToEdit.image);
  }
  ngOnInit(): void {}

  onSubmit() {
    let item = this.editProductForm;
    let id = this.prdToEdit.id;
    this._ProductsService.editProduct(id, item.value).subscribe((res) => {
      console.log('will Update product id No : ' + res.id);
    });
  }
}
