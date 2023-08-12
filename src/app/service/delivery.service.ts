import { Injectable } from "@angular/core";
import { BaseURLService } from "./baseurl.service";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";
import { Delivery } from "../model/delivery.model";



@Injectable()
export class DeliveryService{
 constructor(
  private baseURLService: BaseURLService,
  private httpClient: HttpClient
 ){}


async created(delivery: Delivery){
  return await lastValueFrom(this.httpClient.post(this.baseURLService.getBaseUrl()+ 'Delivery/created/', delivery));
}

async findByOrderId(orderId: number){
  return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl()+'Delivery/findByOrderId/'+orderId));
}

async UpdateDeliveryStatus(id: number){
  return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl()+'Delivery/UpdateDeliveryStatus/'+id));
  }
  async UpdateDeliveryStatus2(id: number){
    return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl()+'Delivery/UpdateDeliveryStatus2/'+id));
  }
}
