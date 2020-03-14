import { Component, OnInit, OnChanges } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: "overview",
  templateUrl: "./overview.component.html",
  styleUrls: ["./overview.component.scss"]
})
export class OverviewComponent implements OnInit {
  budgetData;
  editIncome: boolean = false;
  incomeForm;

  constructor() {}
  ngOnInit(): void {
    this.getBudgetData();
    this.incomeForm = new FormGroup({
      income: new FormControl(this.budgetData.income)
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
  onSubmit() {
    localStorage.setItem("income", this.incomeForm.value.income);
    this.budgetData.income = this.incomeForm.value.income;
  }
  toggleEditIncome() {
    this.editIncome = !this.editIncome;
  }
}
