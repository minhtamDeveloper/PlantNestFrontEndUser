import { Injectable } from "@angular/core";
import { BaseURLService } from "./baseurl.service";
import {HttpClient} from "@angular/common/http";
import { lastValueFrom } from "rxjs";
import { OrderDetail } from "../model/orderdetail.model";


@Injectable()
export class OrderDetailService{

 constructor(
  private baseURLService: BaseURLService,
  private httpClient: HttpClient
 ){}

 async created(orderDetail: OrderDetail[]){
  return await lastValueFrom(this.httpClient.post(this.baseURLService.getBaseUrl()+ 'orderDetail/created/', orderDetail));
}


}
