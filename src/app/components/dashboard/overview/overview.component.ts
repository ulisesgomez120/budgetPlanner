import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
  selector: "overview",
  templateUrl: "./overview.component.html",
  styleUrls: ["./overview.component.scss"]
})
export class OverviewComponent implements OnInit {
  budgetData = {
    expenseTotal: JSON.parse(localStorage.getItem("expenses")).reduce(
      (total, a) => a.amount + total,
      0
    ),
    savings: JSON.parse(localStorage.getItem("savings")),
    income: parseInt(localStorage.getItem("income"))
  };
  constructor() {}

  ngOnInit(): void {}
}
