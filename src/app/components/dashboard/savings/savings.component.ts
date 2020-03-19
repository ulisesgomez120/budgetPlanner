import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
@Component({
  selector: "app-savings",
  templateUrl: "./savings.component.html",
  styleUrls: ["./savings.component.scss"]
})
export class SavingsComponent implements OnInit {
  budgetData;
  moneyLeft;
  editSavingsAmount = false;
  editGoal = false;
  amountToSaveForm;
  atsAfterGoals;
  goalForm;
  editGoalForm;
  iconNames = ["bank"];
  constructor() {}

  ngOnInit(): void {
    this.getBudgetData();
    this.moneyLeft = this.budgetData.income - this.budgetData.expenseTotal;
    this.amountToSaveForm = new FormGroup({
      amount: new FormControl(this.budgetData.amountToSave)
    });
    this.goalForm = new FormGroup({
      name: new FormControl(""),
      icon: new FormControl(""),
      goal: new FormControl(""),
      savePerMonth: new FormControl("")
    });
  }
  deleteGoal(id) {
    console.log(id);
  }
  toggleEditGoal(id) {
    this.editGoal = !this.editGoal;
    let currentgoal = this.budgetData.savings.find(
      (goal: object) => (goal["id"] = id)
    );
    this.editGoalForm = new FormGroup({
      name: new FormControl(currentgoal["name"]),
      icon: new FormControl(currentgoal["icon"]),
      goal: new FormControl(currentgoal["goal"]),
      savePerMonth: new FormControl(currentgoal["savingPerMonth"]),
      current: new FormControl(currentgoal["current"])
    });
  }
  updateGoal(id) {}
  getBudgetData() {
    this.budgetData = {
      expenseTotal: JSON.parse(localStorage.getItem("expensesTotal")),
      amountToSave: JSON.parse(localStorage.getItem("amountToSave")),
      savings: JSON.parse(localStorage.getItem("savings")),
      income: parseInt(localStorage.getItem("income"))
    };
    this.updateAtsAfterGoals();
  }

  onToSave() {
    localStorage.setItem("amountToSave", this.amountToSaveForm.value.amount);
    this.budgetData.amountToSave = this.amountToSaveForm.value.amount;
    this.updateAtsAfterGoals();
  }
  onAddGoal() {
    let savingsArray = this.budgetData.savings;
    let lastGoalId = savingsArray[savingsArray.length - 1].id;
    let nextId = parseInt(lastGoalId.split("s")[0]) + 1;
    savingsArray.push({
      id: nextId + "s",
      name: this.goalForm.value.name,
      icon: this.goalForm.value.icon,
      goal: parseInt(this.goalForm.value.goal),
      current: 0,
      savingPerMonth: parseInt(this.goalForm.value.savePerMonth)
    });
    this.goalForm.reset();
    this.updateAtsAfterGoals();
    localStorage.setItem("savings", JSON.stringify(savingsArray));
  }
  updateAtsAfterGoals() {
    this.budgetData.goalsTotal = this.budgetData.savings.reduce(
      (total, goal) => goal.savingPerMonth + total,
      0
    );
    this.atsAfterGoals =
      this.budgetData.amountToSave - this.budgetData.goalsTotal;
  }
}
