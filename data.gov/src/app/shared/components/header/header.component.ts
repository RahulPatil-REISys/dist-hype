import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { AuthService } from '../../services/auth.service';
import { UsaHeaderPrimaryLink, UsaNavigationLink } from '@gsa-sam/ngx-uswds';
import { primaryNavItems, secondaryNavItems } from './header-data';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  secondaryNavItems: UsaNavigationLink[] = secondaryNavItems;

  primaryNavItems: UsaHeaderPrimaryLink[] = primaryNavItems;

  extended = true;

  displayOverlayOnMenuOpen = false;

  navAriaLabel = 'Demo Navigation';

  linkEvent = ($event) => {
    console.log($event);
  }

  ngOnInit(): void {
  }
}
