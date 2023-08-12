import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";
import { BaseUrlService } from "./baseUrl.service";


@Injectable()
export class ProductService{
 constructor(
  private baseURLService: BaseUrlService,
  private httpClient: HttpClient
 ){}

 async showAll(){
  return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl()+'api/product/showAll'));
}

 async showNewProduct(){
  return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl()+'api/product/showNewProduct'));
}
async showBestSellerProduct(){
  return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl()+'api/product/showBestSellersProduct'));
}

async findProductById(id: string){
  return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl()+'api/product/findProductById/'+id));
}

async findProductByCategoryId(categoryId: string){
  return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl()+'api/product/findProductByCateogryId/'+categoryId));
}

async findProductByCategoryId2(categoryId: string){
  return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl()+'api/product/findProductByCateogryId2/'+categoryId));
}
async findProductByZA(){
  return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl()+'api/product/findProductByZA'));
}

async findProductByAZ(){
  return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl()+'api/product/findProductByAZ'));
}

async findProductByPriceDesc(){
  return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl()+'api/product/findProductByPriceDesc'));
}

async findProductByPriceAsc(){
  return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl()+'api/product/findProductByPriceAsc'));
}

// async findAll(){
//   return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl()+'bouquet/findall'));
// }

// async findByCategoryId(categoryId: string){
//   return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl()+'bouquet/findByCategoryId/'+categoryId));
// }

// async findByPrice(price: string){
//   return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl()+'bouquet/findByPriceRange/'+price));
// }

// async findByEventId(eventId: string){
//   return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl()+'bouquet/findByEventId/'+eventId));
// }



// async findByBouquetId(bouquetId: string){
//   return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl()+'bouquet/findByBouquetId/'+bouquetId));
// }
}
