import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-cmd-modes',
  templateUrl: './cmd-modes.component.html',
  styleUrls: ['./cmd-modes.component.css']
})
export class CmdModesComponent implements OnInit {
  order_modes;
  orderMode = {
    delivery: 'Livraison',
    to_take_away: 'À emporter',
    place: 'Sur place'
  };

  constructor(private dataService: DataService, private apiService: ApiService) { }

  ngOnInit(): void {
    this.getRestaurantOrderModes();
  }

  set cmdMode(cmdMode) {
    this.dataService.cmdMode = cmdMode;
    localStorage.setItem('cmdMode', cmdMode);
  }
  
  get cmdMode() {
    return this.dataService.cmdMode;
  }

  getRestaurantOrderModes() {
    this.apiService.getRestaurantOrderModes().subscribe((result)=>{
      this.order_modes = result;
      console.log('Modes', result);
    });
  }

}
