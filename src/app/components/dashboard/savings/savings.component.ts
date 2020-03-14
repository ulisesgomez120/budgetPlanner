import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
@Component({
  selector: "app-savings",
  templateUrl: "./savings.component.html",
  styleUrls: ["./savings.component.scss"]
})
export class SavingsComponent implements OnInit {
  // income, expense total
  budgetData;
  moneyLeft;
  amountToSaveForm;
  constructor() {}

  ngOnInit(): void {
    this.getBudgetData();
    this.moneyLeft = this.budgetData.income - this.budgetData.expenseTotal;
    this.amountToSaveForm = new FormGroup({
      type: new FormControl("%"),
      amount: new FormControl(this.moneyLeft)
    });
  }

  getBudgetData() {
    this.budgetData = {
      expenseTotal: JSON.parse(localStorage.getItem("expenses")).reduce(
        (total, exp) => exp.amount + total,
        0
      ),
      savings: JSON.parse(localStorage.getItem("savings")),
      income: parseInt(localStorage.getItem("income"))
    };
  }
}
