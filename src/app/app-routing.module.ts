import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { AboutUsComponent } from './component/aboutus/aboutus.component';
import { CartComponent } from './component/cart/cart.component';
import { ShopComponent } from './component/shop/shop.component';
import { ShopdetailComponent } from './component/shopdetail/shopdetail.component';
import { CheckoutComponent } from './component/checkout/checkout.component';
import { ContactComponent } from './component/contact/contact.component';
import { UsersComponent } from './component/users/user.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { MyprofileComponent } from './component/myprofile/myprofile.component';


const routes: Routes = [
  {path: 'register',component: RegisterComponent},
  {path: 'login',component: LoginComponent},
  {path: '',component: UsersComponent, children:[
    {path: '',component: HomeComponent},
    {path: 'home',component: HomeComponent},
    {path: 'aboutus',component: AboutUsComponent},
    {path: 'cart',component: CartComponent},
    {path: 'shop',component: ShopComponent},
    {path: 'shop/shopdetail',component: ShopdetailComponent},
    {path: 'checkout',component: CheckoutComponent},
    {path: 'contact',component: ContactComponent},
    {path: 'myprofile',component: MyprofileComponent},
  ]},

];
// {path: 'login', component: LoginComponnent},


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
