import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUrlService } from '../baseUrl.service';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient,
    private url: BaseUrlService,
  ) {

  }
  private baseUrl: string = String(this.url.getBaseUrl()) + "api/User/";

  tokenResposen: any;

  async resgiter(data: FormData) {
    return await lastValueFrom(this.http.post(this.baseUrl + "create", data));
  }
  async findById(id: string) {
    return await lastValueFrom(this.http.get(this.baseUrl + "find-by-id/" + id));
  }

  async update(id: string, data: FormData) {
    return await lastValueFrom(this.http.put(this.baseUrl + "update/" + id, data));
  }
  async updateAvt(id: string, data: FormData) {
    return await lastValueFrom(this.http.put(this.baseUrl + "update-img/" + id, data));
  }

  async sendCode(data: FormData) {
    return await lastValueFrom(this.http.post(this.baseUrl + "send-code/", data));
  }
  async verify(data: FormData) {
    return await lastValueFrom(this.http.post(this.baseUrl + "verify/", data));
  }
  async changePassword(data: FormData) {
    return await lastValueFrom(this.http.post(this.baseUrl +"change-pasword/", data));
    }
}
