import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './component/home/home.component';
import { AboutUsComponent } from './component/aboutus/aboutus.component';
import { CartComponent } from './component/cart/cart.component';
import { ShopdetailComponent } from './component/shopdetail/shopdetail.component';
import { ShopComponent } from './component/shop/shop.component';
import { CheckoutComponent } from './component/checkout/checkout.component';
import { ContactComponent } from './component/contact/contact.component';
import { PortfolioComponent } from './component/portfolio/portfolio.component';
import { UsersComponent } from './component/users/user.component';
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    UsersComponent,
    HomeComponent,
    AboutUsComponent,
    CartComponent,
    ShopdetailComponent,
    ShopComponent,
    CheckoutComponent,
    ContactComponent,
    PortfolioComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
