import { Injectable } from "@angular/core";

@Injectable()
export class BaseURLService{
  // đặt local của mỗi người vào đây
  private BASE_URL: string = "https://localhost:7224/api/";
  getBaseUrl(): string{
    return this.BASE_URL;
  }

  getBase():string{
    return this.baseUrl;
  }
  private readonly baseUrl = "https://localhost:7224/";
}
