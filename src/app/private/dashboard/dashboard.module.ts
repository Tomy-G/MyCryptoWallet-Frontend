import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CryptotableComponent } from './components/cryptotable/cryptotable.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { TrademodalComponent } from './components/trademodal/trademodal.component';



@NgModule({
  declarations: [
    CryptotableComponent,
    DashboardComponent,
    TrademodalComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatTableModule, MatFormFieldModule, MatPaginatorModule,MatInputModule, MatSortModule, ReactiveFormsModule,
    HttpClientModule,
    MaterialModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
