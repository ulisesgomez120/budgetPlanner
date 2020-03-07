import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { LandingComponent } from "./components/landing/landing.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { OverviewComponent } from "./components/dashboard/overview/overview.component";
import { ExpensesComponent } from "./components/dashboard/expenses/expenses.component";
import { SavingsComponent } from "./components/dashboard/savings/savings.component";

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    DashboardComponent,
    OverviewComponent,
    ExpensesComponent,
    SavingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
