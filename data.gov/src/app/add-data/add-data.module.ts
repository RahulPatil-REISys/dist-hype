import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddDataComponent } from './add-data1/add-data.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms'; 

const routes: Routes = [
  // { path: '', redirectTo: '/transaction', pathMatch: 'full' },
  // { path: 'transaction', component: TransactionHistoryComponent }
  { path: '', component: AddDataComponent }
];

@NgModule({
  declarations: [AddDataComponent],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AddDataModule { 
}
