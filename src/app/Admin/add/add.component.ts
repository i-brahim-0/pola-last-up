import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../../products.service';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import * as bootstrap from '@angular/platform-browser';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent {
  @Input() action: string = '';
  @Input() editPrd: any;
  addProductForm: FormGroup;
  base64: any;
  categoris: any[] = [];

  constructor(
    private fb: FormBuilder,
    private _ProductsService: ProductsService,
    private _Router: Router
  ) {
    this.addProductForm = this.fb.group({
      title: ['', [Validators.required]],
      category: [''],
      price: ['', [Validators.required]],
      description: [''],
      image: [''],
    });

    _ProductsService.getAllCategories().subscribe((data) => {
      this.categoris = data;
    });
  }

  onSubmit() {
    this._ProductsService
      .addPoduct(this.addProductForm.value)
      .subscribe((response) => {
        alert('Success add new product id No : ' + response.id);
      });
    // this._Router.navigate(['/home']);
  }

  handleUpload(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.base64 = reader.result;
    };
  }

}
