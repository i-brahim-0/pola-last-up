import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ProductsService } from '../products.service';
import { Router } from '@angular/router';

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
    private _ProductsService: ProductsService,
    private _Router: Router
  ) {
    _AuthService.currentUser.subscribe(() => {
      if (_AuthService.currentUser.getValue() != null) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    });

    // _ProductsService.getAllCategories().subscribe((data) => {
    //   this.categoris = data;
    // });

    this.gallary();
  }

  ngOnInit(): void {}

  gallary() {
    this._Router.navigate(['products']);
  }

  // selectCategory(cat: any) {
  //   this._ProductsService.storCategory(cat);
  // }

  isLogOut() {
    this._AuthService.logout();
  }
}
