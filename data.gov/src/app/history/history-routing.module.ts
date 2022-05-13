import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';

const routes: Routes = [
    // { path: '', redirectTo: '/transaction', pathMatch: 'full' },
    // { path: 'transaction', component: TransactionHistoryComponent }
    { path: '', component: TransactionHistoryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoryRoutingModule {
    
    constructor(){
        console.log('HistoryRoutingModule');
    }
}
