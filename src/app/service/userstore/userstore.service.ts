import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserstoreService {
  private id$ = new BehaviorSubject<string>("");
  private username$ = new BehaviorSubject<string>("");
  private role$ = new BehaviorSubject<string>("");
  constructor() { }

  public getRoleFormStore(){
    return this.role$.asObservable();
  }
  public setRoleForStore(role:string){
    this.role$.next(role);
  }
  
  public getUsernameFormStore(){
    return this.username$.asObservable();
  }
  public setUsernameForStore(username:string){
    this.username$.next(username);
  }
  
  public getIdFormStore(){
    return this.id$.asObservable();
  }
  public setIdForStore(id:string){
    this.id$.next(id);
  }
}
