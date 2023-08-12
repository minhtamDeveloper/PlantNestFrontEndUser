import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { AboutUsComponent } from './component/aboutus/aboutus.component';
import { CartComponent } from './component/cart/cart.component';
import { ShopComponent } from './component/shop/shop.component';
import { ShopdetailComponent } from './component/shopdetail/shopdetail.component';
import { CheckoutComponent } from './component/checkout/checkout.component';
import { ContactComponent } from './component/contact/contact.component';
import { PortfolioComponent } from './component/portfolio/portfolio.component';
import { UsersComponent } from './component/users/user.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './component/profile/profile/profile.component';
import { VerifyComponent } from './component/verify/verify.component';
import { authChildGuard } from './guard/authChild/auth-child.guard';
import { hasLoginGuard } from './guard/hasLogin/has-login.guard';
import { authGuard } from './guard/auth/auth.guard';


const routes: Routes = [
  { path: 'register', component: RegisterComponent,canActivate:[hasLoginGuard] },
  { path: 'login', component: LoginComponent,canActivate:[hasLoginGuard] },
  { path: 'forgot-password', component: VerifyComponent,canActivate:[hasLoginGuard] },
  {
    path: '', component: UsersComponent, children: [
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      { path: 'aboutus', component: AboutUsComponent },
      { path: 'cart', component: CartComponent },
      { path: 'shop', component: ShopComponent },
      { path: 'shop/shopdetail', component: ShopdetailComponent },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'contact', component: ContactComponent },
      // {path: 'myprofile',component: ProfileComponent},
      // {path:"profile",component:ProfileComponent},
    ]
  },
  {
    path: '', component: UsersComponent,canActivateChild:[authChildGuard],  children: [
      { path: 'myprofile', component: ProfileComponent },
      { path: "profile", component: ProfileComponent },

    ]
  }
];
// {path: 'login', component: LoginComponnent},


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
