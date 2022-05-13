import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryRoutingModule } from './history-routing.module';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';



@NgModule({
  declarations: [TransactionHistoryComponent],
  imports: [
    CommonModule,
    HistoryRoutingModule
  ]
})
export class HistoryModule { }
