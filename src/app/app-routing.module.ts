import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LandingComponent } from "./components/landing/landing.component";

const routes: Routes = [
  {
    path: "dashboard",
    loadChildren: () =>
      import("./components/dashboard/dashboard.module").then(
        (m) => m.DashboardModule
      ),
  },
  { path: "", pathMatch: "full", component: LandingComponent },
  { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
