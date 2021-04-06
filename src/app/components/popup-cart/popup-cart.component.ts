import { Component, OnInit, Input, Output, ViewChild } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-popup-cart',
  templateUrl: './popup-cart.component.html',
  styleUrls: ['./popup-cart.component.css']
})
export class PopupCartComponent implements OnInit {
  deliveryInfo = {delivery_time_ll: 30, delivery_time_ul: 45, fee_delivery:0, min_delivery: 10, city:'', pincode:''};
  
  @Input() cart_open = 0;
  @Output() cart_openChange = new EventEmitter<number>();

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }

  hide() {
    this.cart_open = 0;
    this.cart_openChange.emit(this.cart_open);
  }

  parentEventHandlerFunction(valueEmitted){
    this.cart_open = valueEmitted;
  }

  calcTotal(): number {
    let cart_total = 0;
    this.cartList.forEach((item) => {
      cart_total += ((parseFloat(item.menu.price) + item.suppPrice) * item.qty);
    });
    return cart_total + this.deliveryInfo.fee_delivery;
  }

  get cartList() {
    return this.dataService.cartList;
  }
}
