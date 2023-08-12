import { Injectable } from "@angular/core";
import { BaseURLService } from "./baseurl.service";
import {HttpClient} from "@angular/common/http";
import { lastValueFrom } from "rxjs";
import { Orders } from "../model/order.model";


@Injectable()
export class OrdersService{

 constructor(
  private baseURLService: BaseURLService,
  private httpClient: HttpClient
 ){}

 async created(orders: Orders){
  return await lastValueFrom(this.httpClient.post(this.baseURLService.getBaseUrl()+ 'Order/created/', orders));
}

// async findOrderMax(){
//   return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl()+'Order/findOrderMax'));
// }
async findAll(){
  return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl()+'Order/findAll'));
}
async findByAccountId(accountId: number){
  return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl()+'Order/findByAccountId/'+accountId));
}

async findByAccountId2(accountId: number){
  return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl()+'Order/findByAccountId2/'+accountId));
}

async findByAccountId3(accountId: number){
  return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl()+'Order/findByAccountId3/'+accountId));
}

async updateOrderStatus(orderId: number){
  return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl()+'Order/updateOrderStatus/'+orderId));
}

async updateOrderStatus2(orderId: number){
  return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl()+'Order/updateOrderStatus2/'+orderId));
}
}
