import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../api.service';
import { Product } from '../models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { getCurrencySymbol } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';
import { GlobalConsts } from '../utils/global-consts';
import { CommunicationService } from '../communication.service';

@Component({
  selector: 'app-menu-details-v2',
  templateUrl: './menu-details-v2.component.html',
  styleUrls: ['./menu-details-v2.component.css']
})
export class MenuDetailsV2Component implements OnInit {
  DeliveryCharge = 0;
  menuData;
  cart = {
    menu:{id:null, price:0, picture:null, name:null, alias:null},
    qty:1, suppPrice:0, selectedSize:null, selectedComposition:[], selectedSupplements:[], selectedOptions:[]
  };
  Object = Object;
  
  @Input() alias;
  @Input() nav_open = false;
  @Output() nav_openChange = new EventEmitter<boolean>();
  
  constructor(private communicationService: CommunicationService, private apiService: ApiService, private dataService: DataService, private route: ActivatedRoute, private toastr: ToastrService, private router: Router, private titleService: Title) {
  }
  
  ngOnInit(): void {
    this.apiService.getMenuDetails(this.alias, this.user.id).subscribe((menuData: Product)=>{
      this.menuData = menuData;
      this.cart.menu.name = this.menuData.name;
      this.cart.menu.alias = this.menuData.alias;
      this.cart.menu.picture = this.menuData.picture;
      let priceList = this.menuData.Price;
      this.cart.selectedSize = Object.keys(priceList)[0];
      this.cart.menu.price = priceList[this.cart.selectedSize];
      this.cart.menu.id = this.menuData.id;
      /* this.menuData.compositionUn.forEach((value) => {
        this.cart.selectedComposition.push(value);
      });  */       

      this.titleService.setTitle(this.menuData.name+' - '+GlobalConsts.appName);
    });
    
    /* this.route.paramMap.subscribe(params => {
      this.apiService.getMenuDetails(params.get('alias')).subscribe((menuData: Product)=>{
        this.menuData = menuData;
        this.cart.menu.name = this.menuData.name;
        this.cart.menu.alias = this.menuData.alias;
        this.cart.menu.picture = this.menuData.picture;
        let priceList = this.menuData.Price;
        this.cart.selectedSize = Object.keys(priceList)[0];
        this.cart.menu.price = priceList[this.cart.selectedSize];
        this.cart.menu.id = this.menuData.id;
        this.menuData.compositionUn.forEach((value) => {
          this.cart.selectedComposition.push(value);
        });        

        this.titleService.setTitle(this.menuData.name+' - '+GlobalConsts.appName);
      });
    }); */
  }
  
  get asset_url() {
    return this.dataService.asset_url;
  }

  addToFavorite() {
    if(this.user.id) {
      this.menuData.is_favorite = !this.menuData.is_favorite;
      this.apiService.addFavorite({menu_id: this.menuData.id, user_id: this.user.id}).subscribe((result)=>{
        console.log(result);
        if(result.type == 'success'){
          this.toastr.success(result.message);
          console.log(this.router.url);
          if(this.router.url == '/account?tab=favorites') {
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/account'], {queryParams: {tab: 'favorites'}});
          });
          }
        } else {
          this.toastr.error(result.message);
        }
      });
    } else {
      this.toastr.info('Vous devez se connecter pour pouvoir ajouter les produits aux favoris.')
    }
  }
  
  decrement() {
    if(this.cart.qty!=1){
      this.cart.qty -= 1;
      // this.calcTotal();
    }
  }
  increment() {
    this.cart.qty += 1;
    // this.calcTotal();
  }
  
  onChangeSize(size) {
    this.cart.selectedSize = size;
    this.cart.menu.price = this.menuData.Price[size];
    // this.calcTotal();
  }
  
  Personalize(event, type, obj) {
    if(type === 'composition') {
      if(event.currentTarget.checked !== true) {
        this.cart.selectedComposition.push(obj);
      } else {
        let i = this.cart.selectedComposition.indexOf(obj);
        this.cart.selectedComposition.splice(i, 1);
      }
    } else if(type === 'supplements') {
      if(event.currentTarget.checked === true) {
        this.cart.selectedSupplements.push(obj);
      } else {
        let i = this.cart.selectedSupplements.indexOf(obj);
        this.cart.selectedSupplements.splice(i, 1);
      }
    } else if(type === 'options') {
      if(event.currentTarget.checked === true) {
        this.cart.selectedOptions.push(obj);
      } else {
        let i = this.cart.selectedOptions.indexOf(obj);
        this.cart.selectedOptions.splice(i, 1);
      }
    }
  }

  isActive(type, obj): boolean {
    if(type === 'composition')
      return !this.cart.selectedComposition.includes(obj);
    if(type === 'supplements')
      return this.cart.selectedSupplements.includes(obj);
    if(type === 'options')
      return this.cart.selectedOptions.includes(obj);
  }

  showOptions(objList): string {
    let objResult = [];
    objList.forEach(obj => {
      objResult.push(obj.name+(obj.price?' ('+parseFloat(obj.price[this.cart.selectedSize])+getCurrencySymbol("EUR", "wide")+')':''));
    });
    return objResult.join(', ');
  }
  
  cartTotal(): number {
    if(this.menuData) {
      let suppPrice = 0;
      this.cart.selectedSupplements.forEach((obj) => {
        if(obj.price) suppPrice += parseFloat(obj.price[this.cart.selectedSize]);
      })
      this.cart.selectedOptions.forEach((obj) => {
        if(obj.price) suppPrice += parseFloat(obj.price[this.cart.selectedSize]);
      })
      this.cart.suppPrice = suppPrice;
      return ((parseFloat(this.menuData.Price[this.cart.selectedSize]) + this.cart.suppPrice) * this.cart.qty) + this.DeliveryCharge;
    }
    return 0;
  }
  
  set cartList(cartList) {
    this.dataService.cartList = cartList;
  }
  
  addToCart() {
    let cartStorage = [];
    if (localStorage && localStorage.getItem('cart')) {
      cartStorage = JSON.parse(localStorage.getItem('cart'));

      let item = cartStorage.find(i => 
        i.menu.id === this.cart.menu.id && i.selectedSize === this.cart.selectedSize
        && i.selectedComposition.length === this.cart.selectedComposition.length
        && i.selectedSupplements.length === this.cart.selectedSupplements.length
        && i.selectedOptions.length === this.cart.selectedOptions.length);

      /* let item_exists = cartStorage.some(e =>
        e.menu.id === this.cart.menu.id && e.selectedSize === this.cart.selectedSize
        && e.selectedComposition.length === this.cart.selectedComposition.length
        && e.selectedSupplements.length === this.cart.selectedSupplements.length
        && e.selectedOptions.length === this.cart.selectedOptions.length); */

      if (item) {
        let index = cartStorage.indexOf(item);
        cartStorage[index] = this.cart;
      } else {
        cartStorage.push(this.cart);
      }
      localStorage.setItem('cart', JSON.stringify(cartStorage));
      // return true;
    } else {
      localStorage.setItem('cart', JSON.stringify([]));
      cartStorage = JSON.parse(localStorage.getItem('cart'));            
      cartStorage.push(this.cart);
      localStorage.setItem('cart', JSON.stringify(cartStorage));
      // return true;
    }
    this.cartList = cartStorage;
    this.toastr.success("le produit a été bien ajouté au panier!", 'Bravo!')
  }
  doOrderSubmit() {
    let addToCart = this.addToCart();
    this.communicationService.sendMessage(false);
    // this.router.navigate(['/checkout']);
  }
  
  hide() {
    this.communicationService.sendMessage(false);
  }

  set user(user) {
    this.dataService.user = user;
  }
  get user() {
    return this.dataService.user;
  }
  
}
