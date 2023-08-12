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
import { LoginComponent } from './login/login.component';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { PasswordModule } from 'primeng/password';
import { MessageService} from 'primeng/api';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TokenInterceptor } from './interceptor/token.interceptor';
import { ProfileComponent } from './component/profile/profile/profile.component';
import { VerifyComponent } from './component/verify/verify.component';
import { DialogModule } from 'primeng/dialog';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ProductService } from './service/product.service';
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
    PortfolioComponent,
    ProfileComponent,
    VerifyComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    HttpClientModule,
    MessagesModule,
    AvatarModule,
    AvatarGroupModule,
    ConfirmDialogModule,
    PasswordModule,
    BrowserAnimationsModule,
    DialogModule,
    OverlayPanelModule

  ],
  providers: [MessageService,
    {provide:HTTP_INTERCEPTORS, useClass : TokenInterceptor, multi:true},
    ProductService,
    CategoryService,
    CartService,
    FavoriteCartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
