import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class BudgetDataService {
  constructor(private http: HttpClient) {}

  getDemoBudgetData() {
    return this.http.get("assets/demoData.json");
  }
}
