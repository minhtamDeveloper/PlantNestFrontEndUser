import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseUrlService {
    private base_url: String = "https://localhost:7224/";
    public getBaseUrl(): String { return this.base_url; }
}
