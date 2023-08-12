import { Injectable } from "@angular/core";
import { BaseURLService } from "./baseurl.service";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";


@Injectable()
export class CategoryService{
 constructor(
  private baseURLService: BaseURLService,
  private httpClient: HttpClient
 ){}

 async showFather(){
  return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl()+'category/showCategoryFather'));
}

async ShowSon(){
  return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl()+'category/showCategorySon'));
}

async findByCategoryId(id: number){
  return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl()+'category/selectByCategory/'+id));
}

}
