import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";
import { Cart } from "../model/cart.model";
import { BaseUrlService } from "./baseUrl.service";



@Injectable()
export class CartService{
 constructor(
  private baseURLService: BaseUrlService,
  private httpClient: HttpClient
 ){}

 async created(cart: Cart){
  return await lastValueFrom(this.httpClient.post(this.baseURLService.getBaseUrl()+ 'api/cart/addCart/', cart));
}
async created2(cart: Cart){
  return await lastValueFrom(this.httpClient.post(this.baseURLService.getBaseUrl()+ 'api/cart/addCart2/', cart));
}

}
