import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { BudgetDataService } from "../../../service/budgetData.service";

@Component({
  selector: "overview",
  templateUrl: "./overview.component.html",
  styleUrls: ["./overview.component.scss"]
})
export class OverviewComponent implements OnInit {
  income = new FormControl(4000);
  data;
  constructor(private budgetData: BudgetDataService) {}

  ngOnInit(): void {
    if (window.localStorage.length != 0) {
      console.log(window.localStorage.length);
    } else {
      console.log("no localStorage");
    }
    // this.budgetData.getDemoBudgetData();
  }
}
