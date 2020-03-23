import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LandingComponent } from "./components/landing/landing.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { OverviewComponent } from "./components/dashboard/overview/overview.component";
import { ExpensesComponent } from "./components/dashboard/expenses/expenses.component";
import { SavingsComponent } from "./components/dashboard/savings/savings.component";

const routes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent,
    children: [
      { path: "expenses", component: ExpensesComponent },
      { path: "savings", component: SavingsComponent },
      { path: "overview", component: OverviewComponent },
      { path: "", pathMatch: "full", redirectTo: "/dashboard/overview" }
    ]
  },
  { path: "", component: LandingComponent },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
