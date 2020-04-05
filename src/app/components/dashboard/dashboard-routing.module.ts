import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ExpensesComponent } from "./expenses/expenses.component";
import { SavingsComponent } from "./savings/savings.component";
import { OverviewComponent } from "./overview/overview.component";
import { DashboardComponent } from "./dashboard.component";

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    children: [
      { path: "expenses", component: ExpensesComponent },
      { path: "savings", component: SavingsComponent },
      { path: "overview", component: OverviewComponent },
      { path: "", pathMatch: "full", redirectTo: "/dashboard/overview" },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
