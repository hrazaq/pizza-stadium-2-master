import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './models/user';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  cartList = [];
  cmdMode = 'delivery';
  // user = {uid:null, name:null, email:null, isAuthenticated:false};
  user = new User();
  asset_url = environment.asset_url;

  constructor() {
    try {
      if (localStorage && localStorage.getItem('cart')) {
        this.cartList = JSON.parse(localStorage.getItem('cart'));
      }
  
      if (localStorage && localStorage.getItem('cmdMode')) {
        this.cmdMode = localStorage.getItem('cmdMode');
      } else {
        localStorage.setItem('cmdMode', this.cmdMode);
      }
  
      if (localStorage && localStorage.getItem('user') && localStorage.getItem('user')!==undefined && localStorage.getItem('user')!=='null') {
        this.user = JSON.parse(localStorage.getItem('user'));
      } else {
        if(this.user !== undefined)
        localStorage.setItem('user', JSON.stringify(this.user));
      }
    } catch (error) {
      this.user = new User();
      localStorage.setItem('user', JSON.stringify(this.user));
    }
  }

}