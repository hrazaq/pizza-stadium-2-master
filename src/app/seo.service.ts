import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { GlobalConsts } from './utils/global-consts';

@Injectable({
  providedIn: 'root'
})
export class SEOService {
  title = GlobalConsts.appName+' - Livraison à domicile';
  keywords = 'livraison '+GlobalConsts.mainFood+', '+GlobalConsts.mainFood+' livraison, livraison '+GlobalConsts.city+', commander '+GlobalConsts.mainFood+' en ligne, '+GlobalConsts.mainFood+', livraison à domicile, livraison '+GlobalConsts.mainFood+' TAIBA, livraison gratuite, burger, '+GlobalConsts.mainFood+'s, site commander '+GlobalConsts.mainFood+', '+GlobalConsts.mainFood+' à domicile, pizzeria '+GlobalConsts.city+', commander à emporter, '+GlobalConsts.mainFood+' emporter, '+GlobalConsts.mainFood+'s, livraison nourriture, numéro pizzeria, numéro restaurant, livreur de '+GlobalConsts.mainFood+', commander '+GlobalConsts.mainFood+', ';
  description = 'Votre restaurant '+GlobalConsts.appName+' vous livre à domicile et au bureau vos plats préférés. Commandez en ligne facilement. ';
  
  constructor(private titleSerivice: Title, private meta: Meta) { }

  updateTitle(title: string = null) {
    this.titleSerivice.setTitle(title??this.title);
  }

  updateDescription(desc: string = '') {
    this.meta.updateTag({ name: 'description', content: this.description+desc })
  }
  
  updateKeywords(keywords: [string] = ['']) {
    this.meta.updateTag({ name: 'keywords', content: this.keywords+keywords.join(', ') })
    this.meta.updateTag({ name: 'robots', content: 'index, follow' })
  }
}