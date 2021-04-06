import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { SEOService } from './seo.service';
import { GlobalConsts } from './utils/global-consts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = GlobalConsts.appName+' - Livraison à domicile';

  constructor(private seoService: SEOService, private titleService: Title, private metaService: Meta) {}

  ngOnInit() {
    // default info
    this.seoService.updateTitle();
    this.seoService.updateDescription();
    this.seoService.updateKeywords();

    /* this.titleService.setTitle(this.title);
    this.metaService.addTags([
      {name: 'keywords', content: 'livraison '+GlobalConsts.mainFood+', '+GlobalConsts.mainFood+' livraison, livraison '+GlobalConsts.city+', commander '+GlobalConsts.mainFood+' en ligne, '+GlobalConsts.mainFood+', livraison à domicile, livraison '+GlobalConsts.mainFood+' TAIBA, livraison gratuite, burger, '+GlobalConsts.mainFood+'s, site commander '+GlobalConsts.mainFood+', '+GlobalConsts.mainFood+' à domicile, pizzeria '+GlobalConsts.city+', commander à emporter, '+GlobalConsts.mainFood+' emporter, '+GlobalConsts.mainFood+'s, livraison nourriture, numéro pizzeria, livreur de '+GlobalConsts.mainFood+', commander une '+GlobalConsts.mainFood+''},
      {name: 'description', content: 'Votre restaurant '+GlobalConsts.appName+' vous livre à domicile et au bureau vos plats préférés. Commandez en ligne facilement.'},
      {name: 'robots', content: 'index, follow'}
    ]); */
  }
}
