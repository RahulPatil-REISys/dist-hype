import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocLayoutComponent } from './shared/layout/doc-layout/doc-layout.component';
// import { HistoryLayoutComponent } from './shared/layout/doc-layout/doc-layout.component';
import { AccountGuard } from './dashboard/guard/account.guard';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

const routes: Routes = [

  { path: 'landing', loadChildren: () => import('./landing/landing.module').then(m => m.LandingModule) },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'add', loadChildren: () => import('./add-data/add-data.module').then(m => m.AddDataModule)},
  {
    path: 'dashboard', component: DocLayoutComponent,
    children: [{ path: '', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) }]
  },
  {
    path: 'history',
    children: [{ path: '', loadChildren: () => import('./history/history.module').then(m => m.HistoryModule) }]
  },
  // {
  //   path: 'facilities', component: DocLayoutComponent,
  //   children: [{ path: '', loadChildren: () => import('./table/table.module').then(m => m.TableModule) }]
  // },

  // { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
