import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Router } from '@angular/router';
import { GlobalConsts } from 'src/app/utils/global-consts';
import { ApiService } from 'src/app/api.service';
import { Resaurant } from 'src/app/models/restaurant';
import CircleType from 'circletype';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  appName = GlobalConsts.appName;
  order_modes;
  orderMode = {
    delivery: 'Livraison',
    to_take_away: 'À emporter',
    place: 'Sur place'
  };

  constructor(private dataService: DataService, private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.getRestaurantOrderModes();
    const circleType = new CircleType(document.getElementById('text_cercle'));
    circleType.radius(250);
  }

  set cmdMode(cmdMode) {
    this.dataService.cmdMode = cmdMode;
    localStorage.setItem('cmdMode', cmdMode);
  }
  
  get cmdMode() {
    return this.dataService.cmdMode;
  }

  chooseCmdMode(cmdMode) {
    this.cmdMode = cmdMode;
    this.router.navigate(['/categories']);
  }
  
  getRestaurantOrderModes() {
    this.apiService.getRestaurantOrderModes().subscribe((result)=>{
      this.order_modes = result;
      console.log('Modes', result);
    });
  }
  /* getOrderModes() {
    return this.restaurantInfo ? this.restaurantInfo.order_mode.split(',') : [];
  } */

}
