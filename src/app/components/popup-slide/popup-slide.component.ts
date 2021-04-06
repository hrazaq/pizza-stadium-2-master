import { Component, OnInit, Input, Output } from '@angular/core';
import { Product } from 'src/app/models/product';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-popup-slide',
  templateUrl: './popup-slide.component.html',
  styleUrls: ['./popup-slide.component.css']
})
export class PopupSlideComponent implements OnInit {
  @Input() nav_open = false;
  @Input() menu: Product;
  @Output() nav_openChange = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  hide() {
    this.nav_open = false;
    this.nav_openChange.emit(this.nav_open);
  }

}
