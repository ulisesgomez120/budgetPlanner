import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";

import { DashboardComponent } from "./dashboard.component";
import { OverviewComponent } from "./overview/overview.component";
import { ExpensesComponent } from "./expenses/expenses.component";
import { SavingsComponent } from "./savings/savings.component";

import { DashboardRoutingModule } from "./dashboard-routing.module";

@NgModule({
  declarations: [
    DashboardComponent,
    OverviewComponent,
    ExpensesComponent,
    SavingsComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    MatSortModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
})
export class DashboardModule {}
