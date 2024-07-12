import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isLogin: boolean = false;
  categoris: any[] = [];

  constructor(
    private _AuthService: AuthService,
    private _ProductsService: ProductsService
  ) {
    _AuthService.currentUser.subscribe(() => {
      if (_AuthService.currentUser.getValue() != null) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    });

    _ProductsService.getAllCategories().subscribe((data) => {
      this.categoris = data;
    });
  }

  ngOnInit(): void {}

  selectCategory(cat: any) {
    this._ProductsService.storCategory(cat);
  }

  isLogOut() {
    this._AuthService.logout();
  }
  isGallary() {
    // this._ProductsService.gallary();
  }
}
