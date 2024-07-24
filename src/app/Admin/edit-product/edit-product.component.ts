import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../../products.service';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit, OnChanges {
  @Input() action: string = '';
  @Input() prdToEdit: any;
  @Input() idPrd: any;
  @Output() myEvent = new EventEmitter<any>();
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
    this.editProductForm.get('title')?.setValue(this.prdToEdit.title);
    this.editProductForm.get('price')?.setValue(this.prdToEdit.price);
    this.editProductForm.get('category')?.setValue(this.prdToEdit.category);
    this.editProductForm
      .get('description')
      ?.setValue(this.prdToEdit.description);
    // this.editProductForm.get('image')?.setValue(this.prdToEdit.image);
  }
  ngOnInit(): void {}

  onSubmit() {
    this._ProductsService
      .editProduct(this.idPrd, this.prdToEdit)
      .subscribe((res) => {});
    console.log('Form Value', this.editProductForm.value);
  }
}
