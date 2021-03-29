import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule} from '@angular/common/http'

import { from,Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private hc:HttpClient) { }
  
    
  createUser(userObj):Observable<any>{
    return this.hc.post("/user/register",userObj);
  }

}
