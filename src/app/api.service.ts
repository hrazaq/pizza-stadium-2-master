import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Family } from './models/family';
import { Product } from './models/product';
import { User } from './models/user';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  // PHP_API_SERVER = "http://api.sabrifood.local/v1";
  PHP_API_SERVER = environment.api_url;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  };

  constructor(private httpClient: HttpClient) {}

  // Menu
  getFamilies(user_id = null): Observable<Family[]>{
    let params = new HttpParams().set("id",user_id);
    return this.httpClient.get<Family[]>(`${this.PHP_API_SERVER}/get-all-family-type`, {params: params});
  }

  getMenus(user_id = null): Observable<Family[]>{
    let params = new HttpParams().set("id",user_id);
    return this.httpClient.get<Family[]>(`${this.PHP_API_SERVER}/get-all-menu-family-type`);
  }

  getMenuDetails(alias: string, user_id = null): Observable<Product>{
    let params = new HttpParams().set("user_id",user_id);
    return this.httpClient.get<Product>(`${this.PHP_API_SERVER}/get-menu-details/${alias}`, {params: params});
  }

  getSingleMenuDetails(alias: string): Observable<Product>{
    return this.httpClient.get<Product>(`${this.PHP_API_SERVER}/get-single-menu-details/${alias}`);
  }
  
  // Login
  login(data): Observable<any>{
    return this.httpClient.post<any>(`${this.PHP_API_SERVER}/do-customer-login`, data);
  }

  signinWithSocial(data): Observable<any>{
    return this.httpClient.post<any>(`${this.PHP_API_SERVER}/do-social-login`, data);
  }

  checkLoginCookies(data): Observable<any>{
    let params = new HttpParams().set("email",data.email).set("password", data.password);
    return this.httpClient.get<any>(`${this.PHP_API_SERVER}/check-login-cookies`, {params: params});
  }

  signup(data): Observable<any>{
    return this.httpClient.post<any>(`${this.PHP_API_SERVER}/do-sign-up-for-customer`, data);
  }

  resetPwdEmail(data): Observable<any>{
    return this.httpClient.post<any>(`${this.PHP_API_SERVER}/do-reset-pwd-email`, data);
  }

  resetPwd(data): Observable<any>{
    return this.httpClient.post<any>(`${this.PHP_API_SERVER}/do-reset-pwd`, data);
  }

  verifyResend(data): Observable<any>{
    return this.httpClient.post<any>(`${this.PHP_API_SERVER}/do-verify-resend`, data);
  }

  verify(data): Observable<any>{
    return this.httpClient.post<any>(`${this.PHP_API_SERVER}/do-verify`, data);
  }
  
  // Account
  updateProfile(data): Observable<any>{
    return this.httpClient.post<any>(`${this.PHP_API_SERVER}/do-update-user-profile`, data);
  }

  getFavorites(user_id): Observable<any>{
    let params = new HttpParams().set("id",user_id);
    return this.httpClient.get<any>(`${this.PHP_API_SERVER}/get-favorites`, {params: params});
  }

  addFavorite(data): Observable<any>{
    return this.httpClient.post<any>(`${this.PHP_API_SERVER}/add-favorite`, data);
  }

  addAddress(data): Observable<any>{
    return this.httpClient.post<any>(`${this.PHP_API_SERVER}/do-add-address`, data);
  }

  updateAddress(data, id): Observable<any>{
    return this.httpClient.post<any>(`${this.PHP_API_SERVER}/do-update-address/${id}`, data);
  }

  deleteAddress(data): Observable<any>{
    return this.httpClient.post<any>(`${this.PHP_API_SERVER}/do-delete-address`, data);
  }

  getAddresses(user_id): Observable<any>{
    let params = new HttpParams().set("id",user_id);
    return this.httpClient.get<any>(`${this.PHP_API_SERVER}/get-all-address-of-user`, {params: params});
  }

  getOrders(user_id): Observable<any>{
    let params = new HttpParams().set("id",user_id);
    return this.httpClient.get<any>(`${this.PHP_API_SERVER}/get-all-order-of-user`, {params: params});
  }

  submitOrder(data): Observable<any>{
    return this.httpClient.post<any>(`${this.PHP_API_SERVER}/do-submit-order`, data);
  }

  // Restaurant
  getRestaurantDelivery(): Observable<any>{
    return this.httpClient.get<any>(`${this.PHP_API_SERVER}/get-restaurant-delivery`);
  }

  getRestaurantTime(): Observable<any>{
    return this.httpClient.get<any>(`${this.PHP_API_SERVER}/get-restaurant-time`);
  }

  getRestaurantInfo(): Observable<any>{
    return this.httpClient.get<any>(`${this.PHP_API_SERVER}/get-restaurant-info`);
  }

  getRestaurantOrderModes(): Observable<any>{
    return this.httpClient.get<any>(`${this.PHP_API_SERVER}/get-restaurant-ordermodes`);
  }

  // Other
  contact(data): Observable<any>{
    return this.httpClient.post<any>(`${this.PHP_API_SERVER}/contact`, data);
  }
  
  /* user(): Observable<any>{
    return this.httpClient.get<any>(`${this.PHP_API_SERVER}/get-customer-session-details`);
  } */
}