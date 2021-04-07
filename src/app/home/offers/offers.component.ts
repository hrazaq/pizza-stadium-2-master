import { Component, OnInit } from '@angular/core';
import CircleType from 'circletype';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const circleType = new CircleType(document.getElementById('best_bobun'));
    circleType.radius(250); 
  }

}
