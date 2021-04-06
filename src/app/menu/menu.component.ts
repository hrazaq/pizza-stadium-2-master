import { Component, OnInit, ViewChild, ElementRef, HostListener, EventEmitter, Output, Input } from '@angular/core';
import { Family } from '../models/family';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../data.service';
import { GlobalConsts } from '../utils/global-consts';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { SearchFormComponent } from '../search-form/search-form.component';
import { Product } from '../models/product';
import { ViewportScroller } from '@angular/common';
import { SlugifyPipe } from '../utils/slugify.pipe';
import { CommunicationService } from '../communication.service';

@Component({
  selector: 'app-menu',
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(1000)),
    ]),
  ],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menu;
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
  keyword = '';
  filter = false;
  productList: Product[] = [];
  menuList = [];
  filteredProductList: Product[];
  filteredMenuList = [];
  selectedProduct;
  anchor_trick = false;
  
  @Input() nav_open = false;
  @Input() search_open = false;
  @Output() nav_openChange = new EventEmitter<boolean>();

  @ViewChild(SearchFormComponent) searchForm;

  @HostListener('window:scroll', ['$event']) onScrollEvent($event) {
    this.anchor_trick = window.pageYOffset>120;
  }
  
  constructor(private communicationService: CommunicationService, private apiService: ApiService, private route: ActivatedRoute, private dataService: DataService, private titleService: Title, private toastr: ToastrService, private elRef:ElementRef, private viewportScroller: ViewportScroller, private slugify: SlugifyPipe) {
  }
  
  ngOnInit(): void {
    this.communicationService.message.subscribe(message => {
      this.nav_open = message;
    });
    this.communicationService.search_open.subscribe(search_open => {
      this.search_open = search_open;
      setTimeout(()=>{
        var input_search = this.elRef.nativeElement.querySelector('input.input-search');
        if(input_search) input_search.focus();
      }, 500)
    });

    let paramMap = this.route.snapshot.paramMap;
    this.activatedType = paramMap.get("type")=='p' || paramMap.get("type")=='m' ? paramMap.get("type") : 'p';
    let activatedMenu = parseInt(paramMap.get("menu_id"));
    let activatedMenuName = paramMap.get("menu_name");

    if(activatedMenuName!='pizza') { //do not scroll if first element
      setTimeout(()=>{
        this.scrollTo(activatedMenuName);
      }, 1200)
    }

    let fam;
    this.apiService.getFamilies(this.user.id).subscribe((FamilyList: Family[])=>{
      this.FamilyList = FamilyList;
      if(this.activatedType === 'p') {
        fam = this.FamilyList.find(e => e.id === activatedMenu);
      }
      if(!activatedMenu) {
        fam = null;
      }
      this.openFamily(fam);

      FamilyList.forEach(element => {
        this.productList = this.productList.concat(element.menu_list);
        console.log(this.productList);
        
      });

      this.search();
    });

    /* this.apiService.getMenus().subscribe((MenuFamilyList: Family[])=>{
      this.MenuFamilyList = MenuFamilyList;
      if(this.activatedType === 'm') {
        fam = this.MenuFamilyList.find(e => e.id === activatedMenu);
        this.openMenuFamily(fam);
      }
      
      MenuFamilyList.forEach(element => {
        this.menuList.concat(element.menu_list);
      });

    }); */

    this.route.queryParams.subscribe(params => {
      this.keyword = params['q'];
      if(this.keyword) this.search_open = true;
    });

    setTimeout(()=>{
      var input_search = this.elRef.nativeElement.querySelector('input.input-search');
      if(input_search) input_search.focus();
    }, 1000)
  }

  search() {
    if(this.keyword) {
      let keywords = this.keyword.split(' ');
      
      // this.filteredProductList = this.productList.filter(e => e.name.toLowerCase().includes(this.keyword.toLowerCase()) || e.family.toLowerCase().includes(this.keyword.toLowerCase()))
      this.filteredProductList = this.productList.filter(e => {
        var valid = true;
        keywords.forEach(keyword => {
          valid = valid && (e.name.toLowerCase().includes(keyword.toLowerCase()) || e.family.toLowerCase().includes(keyword.toLowerCase()));
        });
        return valid;
      })
      this.filter = false;
    } else {
      this.filteredProductList = this.productList;
    }
  }

  get show_filter() {
    return this.filter;
  }
  set show_filter(show_filter) {
    this.filter = show_filter;
    this.keyword = '';
  }

  get asset_url() {
    return this.dataService.asset_url;
  }
  
  openProductsTab() {
    this.openFamily(this.FamilyList[0])
  }
  openMenusTab() {
    this.openMenuFamily(this.MenuFamilyList[0]);
  }
  openFamily(fam) {
    this.selectedFamily = fam;
    this.selectedMenuFamily = null;
    if(fam) this.titleService.setTitle('Commander '+fam.name+' en ligne'+' - '+GlobalConsts.appName);
    else this.titleService.setTitle('Commander en ligne'+' - '+GlobalConsts.appName);
  }
  openMenuFamily(fam){
    this.selectedMenuFamily = fam;
    this.selectedFamily = null;
    if(fam) this.titleService.setTitle('Commander '+fam.name+' en ligne'+' - '+GlobalConsts.appName);

  }
  
  addToFavorite(event, menu_id, is_add=1) {
    if(this.user.id) {
      this.toastr.success('Le produit est bien ajouté aux favoris.');
    } else {
      this.toastr.info('Vous devez se connecter pour pouvoir ajouter les produits aux favoris.')
    }
  }
  
  onChangeSize(size, mi, menu_id) {
    this.selectdPrice = size;
    //(<HTMLInputElement>document.getElementById("pick"+menu_id)).innerHTML = this.selectedFamily.menu_list[mi].priceArr2[size].price;
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

  showPopup(menu) {
    console.log('should be 0: ', this.nav_open);
    this.nav_open = true;
    this.selectedProduct = menu;
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

  trackByIndex(index: number, obj: any): any {
    return index;
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

  scrollTo(elementId) {
    if(elementId) {
      let elem = document.getElementById(this.slugify.transform(elementId));
      if(elem) {
        elem.scrollIntoView({behavior: 'smooth'});
      }
      this.anchor_trick = true;
      // this.viewportScroller.scrollToAnchor(this.slugify.transform(elementId));
    }
  }
  
}
