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
  expenses: object[];
  expensesTotal;
  addExpenseForm = new FormGroup({
    name: new FormControl(""),
    amount: new FormControl("")
  });
  currentExpenseId;
  editExpenseForm;
  showEditExpenseForm: boolean = false;
  displayedColumns: string[] = ["name", "amount", "actions"];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  dataSource;
  constructor() {}

  ngOnInit(): void {
    this.getExpenses();
    this.createDataTable();
  }
  addExpense() {
    let lastExpenseId = this.expenses[this.expenses.length - 1]["id"];
    let nextId = parseInt(lastExpenseId.split("s")[0]) + 1;
    let tempCopy = [...this.expenses];
    tempCopy.push({
      id: nextId + "s",
      name: this.addExpenseForm.value.name,
      amount: this.addExpenseForm.value.amount
    });
    this.expenses = tempCopy;
    this.createDataTable();
    this.addExpenseForm.reset();
    localStorage.setItem("expenses", JSON.stringify(this.expenses));
  }
  cancelEdit() {
    this.editExpenseForm.reset();
    this.showEditExpenseForm = false;
  }
  createDataTable() {
    this.dataSource = new MatTableDataSource(this.expenses);
    this.dataSource.sort = this.sort;
  }
  deleteExpense(id: string) {
    let currentExpense = this.expenses.findIndex(
      (exp: object) => exp["id"] === id
    );
    let tempCopy = [...this.expenses];
    tempCopy.splice(currentExpense, 1);
    this.expenses = tempCopy;
    this.createDataTable();
    localStorage.setItem("expenses", JSON.stringify(this.expenses));
  }

  getExpenses() {
    this.expenses = JSON.parse(localStorage.getItem("expenses"));
    this.expensesTotal = JSON.parse(localStorage.getItem("expensesTotal"));
  }

  toggleEditExpenseForm(id: string) {
    this.showEditExpenseForm = true;
    let currentExpense = this.expenses.find((exp: object) => exp["id"] === id);
    this.currentExpenseId = currentExpense["id"];
    this.editExpenseForm = new FormGroup({
      name: new FormControl(currentExpense["name"]),
      amount: new FormControl(currentExpense["amount"])
    });
  }
  updateExpense() {
    let index = this.expenses.findIndex(
      (exp: object) => exp["id"] === this.currentExpenseId
    );
    this.expenses[index] = {
      id: this.currentExpenseId,
      name: this.editExpenseForm.value.name,
      amount: this.editExpenseForm.value.amount
    };
    this.createDataTable();
    localStorage.setItem("expenses", JSON.stringify(this.expenses));
    this.cancelEdit();
  }
}
