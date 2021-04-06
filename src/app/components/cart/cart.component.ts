import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  deliveryInfo = {delivery_time_ll: 30, delivery_time_ul: 45, fee_delivery:0, min_delivery: 10, city:'', pincode:''};
  
  @Input() cart_open = 0;
  @Output() cart_openChange = new EventEmitter<number>();

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

  set user(user: any) {
    this.dataService.user = user;
  }
  
  get user() {
    return this.dataService.user;
  }

  removeItem(item) {
    let cartListU = this.cartList;
    let i = cartListU.indexOf(item);
    cartListU.splice(i, 1);
    this.cartList = cartListU;
    this.updateStorage(cartListU);
  }

  updateStorage(cartList) {
    let cartStorage = [];
    if (localStorage && localStorage.getItem('cart')) {
      cartStorage = JSON.parse(localStorage.getItem('cart'));
      localStorage.setItem('cart', JSON.stringify(cartList));
    }
  }

  decrement(item) {
    if(item.qty>1){
      item.qty -= 1;
      
      let cartList = this.cartList;
      let i = cartList.indexOf(item);
      cartList[i].qty = item.qty;
      this.updateStorage(cartList);
    }
  }
  increment(item) {
    item.qty += 1;
    
    let cartList = this.cartList;
    let i = cartList.indexOf(item);
    cartList[i].qty = item.qty;
    this.updateStorage(cartList);
  }
  
  numberSupp(item) {
    let suppNum = 0;
    if(item.selectedSupplements && item.selectedSupplements.length)
      suppNum += item.selectedSupplements.length;
    if(item.selectedOptions && item.selectedOptions.length)
      suppNum += item.selectedOptions.length;
    return suppNum ? '(+'+suppNum+' supp.)' :'';
  }

  calcTotal(): number {
    let cart_total = 0;
    this.cartList.forEach((item) => {
      cart_total += ((parseFloat(item.menu.price) + item.suppPrice) * item.qty);
    });
    return cart_total + this.deliveryInfo.fee_delivery;
  }

  /* hide() {
    this.cart_open = 0;
    this.cart_openChange.emit(this.cart_open);
  } */

}
