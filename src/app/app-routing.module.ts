import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { CategoriesComponent } from './categories/categories.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'restaurant/:dashed', component: HomeComponent },//restaurant/livraison-
  { path: 'categories', component: CategoriesComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'menu/:type/:menu_id/:menu_name', component: MenuComponent },
  { path: 'menu/:menu_id/:menu_name', component: MenuComponent },
  { path: 'menu/:family/:alias', component: HomeComponent },
  { path: 'single-menu-details/:alias', component: HomeComponent },
  { path: 'login', component: HomeComponent },
  { path: 'password-reset', component: HomeComponent },
  { path: 'verify', component: HomeComponent },
  { path: 'account', component: HomeComponent },
  { path: 'checkout', component: HomeComponent },
  { path: 'confirmation', component: HomeComponent },
  { path: 'contact', component: HomeComponent },
  { path: 'sitemap', component: HomeComponent },
  { path: 'zones-de-livraisons', component: HomeComponent },
  { path: 'legal-notice', component: HomeComponent },
  {path: '404', component: HomeComponent},
  { path: ':dashed', component: HomeComponent },
  {path: '**', component: HomeComponent},
  // {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled',
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
