import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {
  searchForm;
  keyword;

  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private elRef:ElementRef) {
    let keyword;
    this.route.queryParams.subscribe(params => {
      keyword = params['q'];
    });

    this.searchForm = this.formBuilder.group({
      keyword: keyword
    });

    setTimeout(()=>{
      var input_search = this.elRef.nativeElement.querySelector('input.input-search').focus();
    }, 500)
  }

  ngOnInit(): void {
  }

  search(data) {
    this.keyword = data.keyword;
    this.router.navigate(['/menu'], {queryParams: {q: data.keyword}});
  }

}
