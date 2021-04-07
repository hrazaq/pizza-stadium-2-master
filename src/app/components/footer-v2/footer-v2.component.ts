import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer-v2',
  templateUrl: './footer-v2.component.html',
  styleUrls: ['./footer-v2.component.css']
})
export class FooterV2Component implements OnInit {

  social = {
    facebook: 'https://facebook.com/pizza-stadium',
    instagram: 'https://instagram.com/pizza-stadium',
    twitter: 'https://twitter.com/pizza-stadium',
    youtube: 'https://youtube.com/pizza-stadium',
  };

  constructor() { }

  ngOnInit(): void {
  }

}
