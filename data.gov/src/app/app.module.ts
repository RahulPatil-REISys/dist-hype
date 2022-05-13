import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { TableModule } from './table/table.module';
import { LandingModule } from './landing/landing.module';
import { AuthModule } from './auth/auth.module';
import { AddDataModule } from './add-data/add-data.module';
import { HttpClientModule } from '@angular/common/http';
import { NgxUiLoaderModule } from "ngx-ui-loader";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  imports: [
    BrowserModule,
    ToastrModule.forRoot(), 
    NgxUiLoaderModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    LandingModule,
    AuthModule,
    AddDataModule,
    DashboardModule,
    TableModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


