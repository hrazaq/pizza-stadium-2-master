import { Component, OnInit, Attribute, Input } from '@angular/core';
import { Family } from 'src/app/models/family';
import { ApiService } from 'src/app/api.service';
import { DataService } from 'src/app/data.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { GlobalConsts } from '../utils/global-consts';

@Component({
  selector: 'app-product-card-v4',
  templateUrl: './product-card-v4.component.html',
  styleUrls: ['./product-card-v4.component.css']
})
export class ProductCardV4Component implements OnInit {

  @Input() family_name: any;
  @Input() menu: any;
  @Input() city: string;
  @Input() zone: string;

  // menu;
  FamilyList: Family[];
  MenuFamilyList: Family[];
  selectedFamily;
  selectedMenuFamily;
  selectdPrice = 0;
  activatedType = 'p';
  cart = {
    menu:{id:null, price:0, picture:null, name:null, alias:null},
    qty:1, suppPrice:0, selectedSize:null, selectedComposition:[], selectedSupplements:[], selectedOptions:[]
  };
  setQty = {menu_id:0, cart_index:0};
  shadow;
  
  constructor(private apiService: ApiService, private dataService: DataService, private toastr: ToastrService, private router: Router) {
  }
  
  ngOnInit(): void {
  }
  
  get asset_url() {
    return this.dataService.asset_url;
  }
  
  addToFavorite() {
    if(this.user.id) {
      this.menu.is_favorite = !this.menu.is_favorite;
      this.apiService.addFavorite({menu_id: this.menu.id, user_id: this.user.id}).subscribe((result)=>{
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
  
  /* isFavorite() {
    this.apiService.getFavoritesLite(this.user.id).subscribe((result)=>{
      console.log(result);
      this.menu.is_favorite = result.favorites.includes(this.menu.id) && result.type == 'success';
    });
  } */
  
  onChangeSize(size) {
    this.selectdPrice = size;
  }
  
  addToCart(menu) {
    console.log(menu);
    this.cart.menu.name = menu.name;
    this.cart.menu.alias = menu.alias;
    this.cart.menu.picture = menu.picture;
    this.cart.selectedSize = this.selectdPrice;
    let priceList = menu.priceArr2;
    console.log(priceList);
    this.cart.menu.price = priceList[this.cart.selectedSize].price;
    this.cart.menu.id = menu.id;
    this.cart.qty = 1;
    
    let cartStorage = [];
    if (localStorage && localStorage.getItem('cart')) {
      cartStorage = JSON.parse(localStorage.getItem('cart'));
      
      let item = cartStorage.find(i => 
        i.menu.id === this.cart.menu.id && i.selectedSize === this.cart.selectedSize
        && i.selectedComposition.length === this.cart.selectedComposition.length
        && i.selectedSupplements.length === this.cart.selectedSupplements.length
        && i.selectedOptions.length === this.cart.selectedOptions.length);
        
        console.log(item);
        
        if (item) {
          let index = cartStorage.indexOf(item);
          cartStorage[index] = this.cart;
          this.setQty.cart_index = index;
        } else {
          cartStorage.push(this.cart);
          this.setQty.cart_index = this.lastIndex(cartStorage);
        }
        localStorage.setItem('cart', JSON.stringify(cartStorage));
        // return true;
      } else {
        localStorage.setItem('cart', JSON.stringify([]));
        cartStorage = JSON.parse(localStorage.getItem('cart'));            
        cartStorage.push(this.cart);
        this.setQty.cart_index = this.lastIndex(cartStorage);
        localStorage.setItem('cart', JSON.stringify(cartStorage));
        // return true;
      }
      this.cartList = cartStorage;
      
      this.setQty.menu_id = menu.id;
      
      this.toastr.success("le produit a été bien ajouté au panier!", 'Bravo!')
  }
  
  lastIndex(array) {
    return array.length - 1;
  }
  
  decrement(i) {
    if(this.cart.qty>1){
      let cartList = this.cartList;
      cartList[i].qty -= 1;
      this.updateStorage(cartList);
      this.toastr.success("la quantité a été mise à jour!", cartList[i].qty+' '+cartList[i].menu.name)
      
    }
  }
  
  increment(i) {
    let cartList = this.cartList;
    console.log(cartList);
    cartList[i].qty += 1;
    this.updateStorage(cartList);
    this.toastr.success("la quantité a été mise à jour!", cartList[i].qty+' '+cartList[i].menu.name)
    
  }
  
  updateStorage(cartList) {
    let cartStorage = [];
    if (localStorage && localStorage.getItem('cart')) {
      cartStorage = JSON.parse(localStorage.getItem('cart'));
      localStorage.setItem('cart', JSON.stringify(cartList));
    }
  }
  
  set cartList(cartList) {
    this.dataService.cartList = cartList;
  }
  get cartList() {
    return this.dataService.cartList;
  }
  
  set user(user) {
    this.dataService.user = user;
  }
  get user() {
    return this.dataService.user;
  }

}
