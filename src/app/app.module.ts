import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { SlugifyPipe } from './utils/slugify.pipe';
import { SafeUrlPipe } from './utils/safe-url.pipe';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {GoogleLoginProvider, FacebookLoginProvider} from 'angularx-social-login';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { SliderComponent } from './home/slider/slider.component';
import { ServicesComponent } from './home/services/services.component';
import { HomeComponent } from './home/home.component';
import { OffersComponent } from './home/offers/offers.component';
import { MenuComponent } from './menu/menu.component';
import { HeaderComponent } from './components/header/header.component';
import { CategoriesComponent } from './categories/categories.component';
import { HomeproductsComponent } from './home/homeproducts/homeproducts.component';
import { SuggestionsComponent } from './home/suggestions/suggestions.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductCardV2Component } from './product-card-v2/product-card-v2.component';
import { CartMobileComponent } from './components/cart-mobile/cart-mobile.component';
import { CartComponent } from './components/cart/cart.component';
import { PopupSlideComponent } from './components/popup-slide/popup-slide.component';
import { MenuDetailsV2Component } from './menu-details-v2/menu-details-v2.component';
import { PopupCartComponent } from './components/popup-cart/popup-cart.component';
import { CmdModesComponent } from './components/cmd-modes/cmd-modes.component';
import { SearchFormComponent } from './search-form/search-form.component';

registerLocaleData(localeFr);

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      // timeOut: 10000,
      // preventDuplicates: true,
      // positionClass: 'toast-bottom-right',
    }),
    FormsModule,
    NgbModule,
    SocialLoginModule
  ],
  declarations: [
    AppComponent,
    FooterComponent,
    SliderComponent,
    ServicesComponent,
    HomeComponent,
    OffersComponent,
    MenuComponent,
    HeaderComponent,
    CategoriesComponent,
    SlugifyPipe,
    SafeUrlPipe,
    HomeproductsComponent,
    SuggestionsComponent,
    ProductCardComponent,
    ProductCardV2Component,
    CartMobileComponent,
    CartComponent,
    PopupSlideComponent,
    MenuDetailsV2Component,
    PopupCartComponent,
    SearchFormComponent,
    CmdModesComponent
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR'},
    SlugifyPipe,
    SafeUrlPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
