import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  isLogin: boolean = false;
  categoris: any[] = [];
  selectedCategory = '';
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

  isLogOut() {
    this._AuthService.logout();
  }
  categoryName(cat: string) {
    this.selectedCategory = cat;
    console.log(cat);
  }
}
