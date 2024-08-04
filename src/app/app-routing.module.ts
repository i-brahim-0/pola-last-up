import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import { RegisterComponent } from './register/register.component';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './auth.guard';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AdminPageComponent } from './Admin/admin-page/admin-page.component';
import { EditProductComponent } from './Admin/edit-product/edit-product.component';
import { AddComponent } from './Admin/add/add.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', canActivate: [AuthGuard], component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'products',
    canActivate: [AuthGuard],
    component: ProductsComponent,
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    component: AdminPageComponent,
  },
  {
    path: 'cart',
    canActivate: [AuthGuard],
    component: CartComponent,
  },
  // {
  //   path: 'add',
  //   canActivate: [AuthGuard],
  //   component: AddComponent,
  // },
  // {
  //   path: 'edit',
  //   canActivate: [AuthGuard],
  //   component: EditProductComponent,
  // },

  {
    path: 'prodetails/:id',
    canActivate: [AuthGuard],
    component: ProductDetailsComponent,
  },
  {
    path: 'products/:cat',
    canActivate: [AuthGuard],
    component: ProductsComponent,
  },
  { path: 'about', component: AboutComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
