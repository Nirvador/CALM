/**
 * Created by Romain on 08/03/2017.
 */
import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {User} from "../models/user";
import {Observable} from "rxjs";
import {AuthenticationService} from './authentication.service';
import {Address} from "../models/address";

@Injectable()
export class UsersService {

  constructor(private http: Http, private authentication: AuthenticationService) {}

  // Get all users from the API
  getUsers() {
    return this.http.get('https://localhost:3000/api/users', this.authentication.getRequestOptions())
      .map(res => res.json());
  }

  deleteUser(id : string) : Observable<void> {
    if (this.authentication.currentUserId() == id) {
      this.authentication.logout();
    }
    return this.http.delete('https://localhost:3000/api/users/' + id, this.authentication.getRequestOptions())
      .map(res => console.log("Users Service : delete user code : "+ res));
  }

  deleteAddress(id : string) : Observable<void> {
    return this.http.delete('https://localhost:3000/api/addresses/' + id, this.authentication.getRequestOptions())
      .map(res => console.log("Users Service : delete address code : "+ res));
  }

  getProfile() {
    return this.http.get('https://localhost:3000/api/profile', this.authentication.getRequestOptions())
      .map(res => res.json());
  }

  getAddressById(id : string) {
    return this.http.get('https://localhost:3000/api/addresses/' +id, this.authentication.getRequestOptions())
      .map(res => res.json());
  }

  getAddresses() {
    return this.http.get('https://localhost:3000/api/addresses', this.authentication.getRequestOptions())
      .map(res => res.json());
  }

  getDoctors() {
    return this.http.get('https://localhost:3000/api/doctors', this.authentication.getRequestOptions())
      .map(res => res.json());
  }

}