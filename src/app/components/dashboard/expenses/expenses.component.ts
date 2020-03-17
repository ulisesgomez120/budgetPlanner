import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: "app-expenses",
  templateUrl: "./expenses.component.html",
  styleUrls: ["./expenses.component.scss"]
})
export class ExpensesComponent implements OnInit {
  expenses: [];
  expensesTotal;
  addExpenseForm = new FormGroup({
    name: new FormControl(""),
    amount: new FormControl("")
  });
  editExpenseForm;
  showEditExpenseForm: boolean = false;
  displayedColumns: string[] = ["name", "amount", "actions"];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  dataSource;
  constructor() {}

  ngOnInit(): void {
    this.getExpenses();
    this.dataSource = new MatTableDataSource(this.expenses);
    this.dataSource.sort = this.sort;
  }
  addExpense() {
    console.log("added");
  }
  deleteExpense(id: string) {
    console.log(id);
  }

  getExpenses() {
    this.expenses = JSON.parse(localStorage.getItem("expenses"));
    this.expensesTotal = JSON.parse(localStorage.getItem("expensesTotal"));
  }

  toggleEditExpenseForm(id: string) {
    console.log(id);
    // let currentExpense = this.expenses.find((exp: object) => (exp["id"] = id));
    // this.editExpenseForm = new FormGroup({
    //   name: new FormControl(currentExpense["name"]),
    //   amount: new FormControl(currentExpense["amount"])
    // });
  }
}
