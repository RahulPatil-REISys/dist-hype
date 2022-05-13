import { Component, ElementRef, Inject, Renderer2, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
// import 'rxjs/add/operator/filter';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { NavigationEnd, Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private _router: Subscription;
  isLogin = false;
    @ViewChild(NavbarComponent) navbar: NavbarComponent;

    constructor( private renderer : Renderer2, private router: Router, @Inject(DOCUMENT,) private document: any, private element : ElementRef) {}
    ngOnInit() {
        setTimeout(() => {
            var navbar : HTMLElement = this.element.nativeElement.children[0].children[0];
            console.log(navbar);
            // this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
            //     if (window.outerWidth > 991) {
            //         window.document.children[0].scrollTop = 0;
            //     }else{
            //         window.document.activeElement.scrollTop = 0;
            //     }
            //     this.navbar.sidebarClose();
            // });
            this.renderer.listen('window', 'scroll', (event) => {
                const number = window.scrollY;
                if (number > 100 || window.pageYOffset > 100) {
                    navbar.classList.remove('navbar-transparent');
                } else {
                    navbar.classList.add('navbar-transparent');
                }
            });
            var ua = window.navigator.userAgent;
            var trident = ua.indexOf('Trident/');
            if (trident > 0) {
                // IE 11 => return version number
                var rv = ua.indexOf('rv:');
                var version = parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
            }
            if (version) {
                var body = document.getElementsByTagName('body')[0];
                body.classList.add('ie-background');

            }

            this.isLogin = window.location.href.includes('login');
            console.log(this.isLogin);
        },1000);
    }
    removeFooter() {
      return false;
    }
    
}
