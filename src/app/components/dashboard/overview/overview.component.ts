import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
  selector: "overview",
  templateUrl: "./overview.component.html",
  styleUrls: ["./overview.component.scss"]
})
export class OverviewComponent implements OnInit {
  income;
  data;
  constructor() {}

  ngOnInit(): void {}
}
