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
import { UsersComponent } from './component/users/user.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { MyprofileComponent } from './component/myprofile/myprofile.component';
import { BaseURLService } from './service/baseurl.service';
import { ProductService } from './service/product.service';
import { HttpClientModule } from '@angular/common/http';
import { CategoryService } from './service/category.service';
import { CartService } from './service/cart.service';
import { FavoriteCartService } from './service/favoritecart.service';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    UsersComponent,
    HomeComponent,
    AboutUsComponent,
    CartComponent,
    ShopdetailComponent,
    ShopComponent,
    CheckoutComponent,
    ContactComponent,
    MyprofileComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, // Thêm FormsModule vào imports
    ReactiveFormsModule,
    HttpClientModule


  ],
  providers: [
    BaseURLService,
    ProductService,
    CategoryService,
    CartService,
    FavoriteCartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
