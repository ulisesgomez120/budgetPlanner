import { Component, OnInit, OnDestroy } from "@angular/core";
import { BudgetDataService } from "../../service/budgetData.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  constructor(private demoData: BudgetDataService) {}

  ngOnInit(): void {
    if (localStorage.length === 0) {
      this.demoData.getDemoBudgetData().subscribe(res => {
        let budgetObj = res[0]["budget"];
        localStorage.setItem("income", budgetObj["income"]);
        localStorage.setItem("expenses", JSON.stringify(budgetObj["expenses"]));
        localStorage.setItem("savings", JSON.stringify(budgetObj["savings"]));
      });
    }
  }
}
