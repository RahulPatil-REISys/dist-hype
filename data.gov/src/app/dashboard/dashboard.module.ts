import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsaSearchModule } from '@gsa-sam/ngx-uswds';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { ProfileComponent } from './components/profile/profile.component';
import { SettingsComponent } from './components/settings/settings.component';
import { DashboardViewComponent } from './components/dashboard-view/dashboard-view.component';

@NgModule({
  declarations: [ProfileComponent, SettingsComponent, DashboardViewComponent],
  imports: [
    CommonModule,
    UsaSearchModule,
    DashboardRoutingModule,
  ]
})
export class DashboardModule { }
