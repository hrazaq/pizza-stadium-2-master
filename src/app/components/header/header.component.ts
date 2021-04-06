import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Router, Event, NavigationStart, NavigationEnd } from '@angular/router';
import { CommunicationService } from 'src/app/communication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  deliveryInfo = {delivery_time_ll: 30, delivery_time_ul: 45, fee_delivery:0, min_delivery: 10, city:'', pincode:''};
  nav_open = 0;
  search_open = false;
  cart_open = 0;
  search_force_close = 0;
  no_sticky = 0;
  
  constructor(private communicationService: CommunicationService, private dataService: DataService, public router: Router) {
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.search_open = false;
      }
      if (event instanceof NavigationEnd) {
        if(event.url.startsWith('/menu')) {
          this.search_force_close = 1;
          this.no_sticky = 1;
        } else {
          this.search_force_close = 0;
        }
      }
    })
  }
  
  ngOnInit() {
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

  openSearch() {
    this.search_open = !this.search_open;
    this.communicationService.emitSearchOpen(this.search_open);
    document.getElementById('wrapper').scrollIntoView({behavior: 'smooth'});
    /* if(this.search_force_close) {
      this.search_open = !this.search_open;
      this.communicationService.emitSearchOpen(this.search_open);
      document.getElementById('wrapper').scrollIntoView({behavior: 'smooth'});
    } else {
      document.getElementById('wrapper').scrollIntoView({behavior: 'smooth'});
      this.search_open = !this.search_open;
    } */
  }
  
}
