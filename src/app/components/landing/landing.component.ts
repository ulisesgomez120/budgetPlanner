import { Component, OnInit } from "@angular/core";
import { BudgetDataService } from "../../service/budgetData.service";

@Component({
  selector: "landing",
  templateUrl: "./landing.component.html",
  styleUrls: ["./landing.component.scss"]
})
export class LandingComponent implements OnInit {
  constructor(private demoData: BudgetDataService) {}

  ngOnInit(): void {
    if (localStorage.length === 0) {
      this.demoData.getDemoBudgetData().subscribe(res => {
        let budgetObj = res[0]["budget"];
        let expensesTotal = budgetObj["expenses"].reduce(
          (total, exp) => exp.amount + total,
          0
        );
        let amountToSave = (budgetObj["income"] - expensesTotal) * 0.75;
        localStorage.setItem("income", budgetObj["income"]);
        localStorage.setItem("expenses", JSON.stringify(budgetObj["expenses"]));
        localStorage.setItem("savings", JSON.stringify(budgetObj["savings"]));
        localStorage.setItem("expensesTotal", JSON.stringify(expensesTotal));
        localStorage.setItem("amountToSave", JSON.stringify(amountToSave));
      });
    }
  }
}
