import { Component, OnInit } from '@angular/core';
import { GlobalConsts } from 'src/app/utils/global-consts';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  appName = GlobalConsts.appName;
  mainFood = GlobalConsts.mainFood;
  city = GlobalConsts.city;
  zip = GlobalConsts.zip;
  map = GlobalConsts.map;
  address = GlobalConsts.city +' '+ GlobalConsts.zip;
  phone = '0666666666';
  email = 'contact@pizza-stadium.fr';
  social = {
    facebook: 'https://facebook.com/pizza-stadium',
    instagram: 'https://instagram.com/pizza-stadium',
    twitter: 'https://twitter.com/pizza-stadium',
    youtube: 'https://youtube.com/pizza-stadium',
  };
  zones;

  constructor(private apiService: ApiService) {
    this.apiService.getRestaurantInfo().subscribe((result)=>{
      console.log(result);
      
      this.appName = result.name;
      this.city = result.city;
      this.zip = result.pincode;
      this.address = result.address+' '+result.city+' '+result.pincode;
      this.phone = result.phone;
      this.email = result.email;
      this.social = result.social;
    });

    this.apiService.getRestaurantDelivery().subscribe((result)=>{
      this.zones = result;
    });
  }

  ngOnInit(): void {
  }

}
