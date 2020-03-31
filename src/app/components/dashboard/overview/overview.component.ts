import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Validators } from "@angular/forms";
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
      income: new FormControl(this.budgetData.income, [
        Validators.required,
        Validators.min(1)
      ])
    });
  }
  get income() {
    return this.incomeForm.get("income");
  }
  getBudgetData() {
    this.budgetData = {
      expenseTotal: JSON.parse(localStorage.getItem("expensesTotal")),
      savings: JSON.parse(localStorage.getItem("savings")),
      income: parseInt(localStorage.getItem("income"))
    };
  }
  cancelEdit() {
    this.editIncome = false;
  }
  showEditIncomeForm() {
    this.editIncome = true;
    setTimeout(() => {
      const inputFocus = document.getElementById("edit-income");
      inputFocus.focus();
    }, 1);
  }
  onSubmit() {
    this.budgetData.income = this.incomeForm.value.income;
    localStorage.setItem("income", this.incomeForm.value.income);
    this.cancelEdit();
  }
}
