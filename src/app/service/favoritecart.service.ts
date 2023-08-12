import { Injectable } from "@angular/core";
import { BaseUrlService } from "./baseUrl.service";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";
import { Cart } from "../model/cart.model";
import { FavoriteCart } from "../model/favoritecart.model";


@Injectable()
export class FavoriteCartService{
 constructor(
  private baseURLService: BaseUrlService,
  private httpClient: HttpClient
 ){}

 async created(favoriteCart: FavoriteCart){
  return await lastValueFrom(this.httpClient.post(this.baseURLService.getBaseUrl()+ 'api/favoritecart/addFavoriteCart/', favoriteCart));
}

}
