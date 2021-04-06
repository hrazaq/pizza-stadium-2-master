import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-cart-mobile',
  templateUrl: './cart-mobile.component.html',
  styleUrls: ['./cart-mobile.component.css']
})
export class CartMobileComponent implements OnInit {
  deliveryInfo = {delivery_time_ll: 30, delivery_time_ul: 45, fee_delivery:0, min_delivery: 10, city:'', pincode:''};
  cart_open = 0;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }

  get asset_url() {
    return this.dataService.asset_url;
  }
  
  set cartList(cartList) {
    this.dataService.cartList = cartList;
  }
  
  get cartList() {
    return this.dataService.cartList;
  }

  calcTotal(): number {
    let cart_total = 0;
    this.cartList.forEach((item) => {
      cart_total += ((parseFloat(item.menu.price) + item.suppPrice) * item.qty);
    });
    return cart_total + this.deliveryInfo.fee_delivery;
  }

}
