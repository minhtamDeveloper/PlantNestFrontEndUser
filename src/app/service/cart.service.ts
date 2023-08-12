import { Injectable } from "@angular/core";
import { BaseURLService } from "./baseurl.service";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";
import { Cart } from "../model/cart.model";


@Injectable()
export class CartService{
 constructor(
  private baseURLService: BaseURLService,
  private httpClient: HttpClient
 ){}

 async created(cart: Cart){
  return await lastValueFrom(this.httpClient.post(this.baseURLService.getBaseUrl()+ 'cart/addCart/', cart));
}
async created2(cart: Cart){
  return await lastValueFrom(this.httpClient.post(this.baseURLService.getBaseUrl()+ 'cart/addCart2/', cart));
}

async findByAccountId(accountId: string){
  return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl()+'cart/findByAccountId/'+accountId));
}

async update(cart: Cart){
  return await lastValueFrom(this.httpClient.put(this.baseURLService.getBaseUrl()+'cart/updateCart',cart));
}

async delete(cartId: string){
  return await lastValueFrom(this.httpClient.delete(this.baseURLService.getBaseUrl()+'cart/deleteCart/'+cartId));
}
}
