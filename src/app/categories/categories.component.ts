import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { ApiService } from '../api.service';
import { Family } from '../models/family';
import { SlugifyPipe } from '../utils/slugify.pipe';
import { Title } from '@angular/platform-browser';
import { DataService } from '../data.service';
import { GlobalConsts } from '../utils/global-consts';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  FamilyList: Family[];
  MenuFamilyList: Family[];
  searchForm;

  constructor(private apiService: ApiService, private dataService: DataService, private formBuilder: FormBuilder, private router: Router, private slugifyPipe: SlugifyPipe, private titleService: Title) {
    this.apiService.getFamilies().subscribe((FamilyList: Family[])=>{
      this.FamilyList = FamilyList;
    });

    /* this.apiService.getMenus().subscribe((MenuFamilyList: Family[])=>{
      this.MenuFamilyList = MenuFamilyList;
    }); */

    this.searchForm = this.formBuilder.group({
      keyword: ''
    });
  }

  ngOnInit(): void {
    this.titleService.setTitle('Découvrez notre carte'+' - '+GlobalConsts.appName);
  }

  /* goToMenu(menu, type) {
    this.router.navigate(['/menu/'+type+'/'+menu.id+'/'+this.slugifyPipe.transform(menu.name)]);
  } */

  goToMenu(menu) {
    this.router.navigate(['/menu/'+menu.id+'/'+this.slugifyPipe.transform(menu.name)]);
  }

  get asset_url() {
    return this.dataService.asset_url;
  }

  search(data) {
    this.router.navigate(['/menu'], {queryParams: {q: data.keyword}});
  }

}
