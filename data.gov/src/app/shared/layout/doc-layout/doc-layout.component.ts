import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-doc-layout',
  templateUrl: './doc-layout.component.html',
  styleUrls: ['./doc-layout.component.scss']
})
export class DocLayoutComponent implements OnInit {
  url;


  @Input() buttonText: string = 'Search';
  @Input() size: 'big';
  @Input() placeholder: string = 'Search Placeholder';
  @Input() id: string = 'search-basic';
  @Input() ariaLabel: string = 'search basic';
  @Input() name: string = 'searchBasic';
  
  @Input() searchTextChange: Function = ($event) => {
    console.log($event);
  }

  @Input() onBlur: Function = ($event) => {
    console.log($event);
  }

  animation: boolean = false;

  /**
   * An array or comma separated strings of panel ids that should be opened **initially**.
   *
   * For subsequent changes use methods like `expand()`, `collapse()`, etc. and
   * the `(panelChange)` event.
   */
  activeIds: string[] = [];

  /**
   *  If `true`, only one panel could be opened at a time.
   *
   *  Opening a new panel will close others.
   */
  singleSelect: boolean = false;

  /**
   * Type of panels.
   *
   * Bootstrap provides styles for the following types: `'success'`, `'info'`, `'warning'`, `'danger'`, `'primary'`,
   * `'secondary'`, `'light'` and `'dark'`.
   */
  bordered: boolean;

  /**
   * Heading level to use for accordion headers - possible inputs are anywhere from heading level 2 to 6.
   */
  headerLevel: 2 | 3 | 4 | 5 | 6 = 4;

  onPanelChange($event) {
    console.log($event);
  }

  shown($event) {
    console.log($event);
  }

  hidden($event) {
    console.log($event);
  }


  facilitiesSubMenu = {
    "View": "",
    "Map": ""
  }

  constructor(private route: ActivatedRoute,) {

    const url: Observable<string> = route.url.pipe(map(segments => segments.join('')));

    url.subscribe(url => this.url = url);
    // url.toPromise().then(data => console.log(data))
    // this.route
    //   .queryParamMap
    //   .pipe(map(params => params.get('login_attempt') || 'None')).subscribe(res => {
    //     this.isLoginAttemptFailed = res === 'failed';
    //   });
  }

  ngOnInit(): void {
    this.generateSubMenu(this.url)

  }

  generateSubMenu(url) {
    if (url === "facilities") {
      console.log(`came from /facilities`)
    } else if (url === "dashboard") {
      console.log(`came from /dashboard`)
    } else if(url === "history") {
      console.log(`came from /history`)
    }
  }



}
