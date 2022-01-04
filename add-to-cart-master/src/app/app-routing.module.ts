import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './component/admin/dashboard/dashboard.component';
import { LoginComponent } from './component/admin/login/login.component';
import { CartComponent } from './component/cart/cart.component';
import { ProductsComponent } from './component/products/products.component';

const routes: Routes = [
  {path:'admin', component: LoginComponent},
  {path:'admin/login', component: LoginComponent},
  {path:'admin/dashboard', component: DashboardComponent},
  //{path:'', redirectTo:'products',pathMatch:'full'},
  {path:'products', component: ProductsComponent},
  {path:'cart', component: CartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
