import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { SEOService } from '../seo.service';
import { GlobalConsts } from '../utils/global-consts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  mainFood = GlobalConsts.mainFood;
  city = GlobalConsts.city;
  zone;

  constructor(private seoService: SEOService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // restaurant/livraison-burger-daoudiate-40140
    let dashed = this.route.snapshot.params.dashed;
    if(dashed && dashed.startsWith('livraison')) {
      let params = dashed.split('-');
      if(params.length > 2) {
        this.mainFood = params[1];
        this.city = params[2];
        this.zone = params.slice(3)?.join(' ');
        
        this.seoService.updateTitle('Livraison '+this.mainFood+' à '+this.city+' '+this.zone+' - '+GlobalConsts.appName);
        this.seoService.updateDescription('Livraison '+this.mainFood+' à '+this.city+' '+this.zone);
        this.seoService.updateKeywords(['Livraison '+this.mainFood+' à '+this.city+' '+this.zone]);
      }
    }
  }

}
