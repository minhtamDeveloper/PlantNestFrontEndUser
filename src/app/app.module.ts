import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
import { NgxPayPalModule } from 'ngx-paypal';
import { DatePipe } from '@angular/common';
import { OrdersService } from './service/order.service';
import { OrderDetailService } from './service/orderdetail.service';
import { DeliveryService } from './service/delivery.service';
import { DeliveryComponent } from './component/delivery/delivery.compoent';
import { FavoriteComponent } from './component/favoritecart/favoritecart.component';
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
    MyprofileComponent,
    DeliveryComponent,
    FavoriteComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, // Thêm FormsModule vào imports
    ReactiveFormsModule,
    HttpClientModule,
    NgxPayPalModule

  ],
  providers: [
    BaseURLService,
    ProductService,
    CategoryService,
    CartService,
    FavoriteCartService,
    OrdersService,
    OrderDetailService,
    DeliveryService,
    DatePipe
  ],
  bootstrap: [AppComponent],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
