import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from 'rxjs';
import { BaseUrlService } from './baseUrl.service';

@Injectable()
export class CategoryService{
 constructor(
  private baseURLService: BaseUrlService,
  private httpClient: HttpClient
 ){}

 async showFather(){
  return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl()+'api/category/showCategoryFather'));
}

async ShowSon(){
  return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl()+'api/category/showCategorySon'));
}

async findByCategoryId(id: number){
  return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl()+'api/category/selectByCategory/'+id));
}

}
