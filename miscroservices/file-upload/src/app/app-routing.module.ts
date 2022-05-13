import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashbaordComponent } from './dashbaord/dashbaord.component';
import { FileuploadComponent } from './fileupload/fileupload.component';
import { FilevalidateComponent } from './filevalidate/filevalidate.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'upload', component: FileuploadComponent },
  { path: 'validate', component: FilevalidateComponent },
  { path: 'dashboard/:id', component: DashbaordComponent },
  { path: 'login', component: LoginComponent },
  { path: 'landing', component: LandingComponent },
  { path: '**', redirectTo:'login',pathMatch:'full' },
  { path: '', redirectTo:'login',pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
