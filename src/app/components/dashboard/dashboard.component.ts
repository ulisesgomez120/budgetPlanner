import { Component, OnInit } from "@angular/core";
import { BudgetDataService } from "../../service/budgetData.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  constructor(private budgetData: BudgetDataService) {}

  ngOnInit(): void {
    if (window.localStorage.length === 0) {
      this.budgetData.getDemoBudgetData().subscribe(res => {
        let budgetObj = res[0]["budget"];
        window.localStorage.setItem("income", budgetObj["income"]);
        window.localStorage.setItem(
          "expenses",
          JSON.stringify(budgetObj["expenses"])
        );
        window.localStorage.setItem(
          "savings",
          JSON.stringify(budgetObj["savings"])
        );
      });
    }
  }
}
