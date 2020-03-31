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
  showEditSavingsAmount = false;
  showEditGoalForm = false;
  amountToSaveForm;
  atsAfterGoals;
  goalForm;
  editGoalForm;
  updateGoalId;
  iconNames = ["General", "Savings", "Trip"];
  iconNamesHashMap = {
    General: "monetization_on",
    Savings: "account_balance",
    Trip: "flight"
  };
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
    setTimeout(() => {
      const inputFocus = document.getElementById("add-goal-name");
      inputFocus.focus();
    }, 1);
  }
  addAmountToSave() {
    localStorage.setItem("amountToSave", this.amountToSaveForm.value.amount);
    this.budgetData.amountToSave = this.amountToSaveForm.value.amount;
    this.updateAtsAfterGoals();
  }
  addGoal() {
    let savingsArray = this.budgetData.savings;
    let lastGoalId = savingsArray[savingsArray.length - 1].id;
    let nextId = parseInt(lastGoalId.split("s")[0]) + 1;
    let iconName = this.iconNamesHashMap[this.goalForm.value.icon];
    savingsArray.push({
      id: nextId + "s",
      name: this.goalForm.value.name,
      icon: iconName,
      goal: parseInt(this.goalForm.value.goal),
      current: 0,
      savingPerMonth: parseInt(this.goalForm.value.savePerMonth)
    });
    this.goalForm.reset();
    this.updateAtsAfterGoals();
    localStorage.setItem("savings", JSON.stringify(savingsArray));
  }
  cancelEdit() {
    this.editGoalForm.reset();
    this.showEditGoalForm = false;
  }
  deleteGoal(id) {
    let currentGoal = this.budgetData.savings.findIndex(
      (goal: object) => goal["id"] === id
    );
    this.budgetData.savings.splice(currentGoal, 1);
    this.updateAtsAfterGoals();
    localStorage.setItem("savings", JSON.stringify(this.budgetData.savings));
  }
  getBudgetData() {
    this.budgetData = {
      expenseTotal: JSON.parse(localStorage.getItem("expensesTotal")),
      amountToSave: JSON.parse(localStorage.getItem("amountToSave")),
      savings: JSON.parse(localStorage.getItem("savings")),
      income: parseInt(localStorage.getItem("income"))
    };
    this.updateAtsAfterGoals();
  }

  toggleEditGoalForm(id) {
    this.showEditGoalForm = true;
    const currentGoal = this.budgetData.savings.find(
      (goal: object) => goal["id"] === id
    );
    this.updateGoalId = currentGoal["id"];
    let iconName;

    for (let key in this.iconNamesHashMap) {
      if (this.iconNamesHashMap[key] === currentGoal["icon"]) {
        iconName = key;
        break;
      } else {
        iconName = "General";
      }
    }
    this.editGoalForm = new FormGroup({
      name: new FormControl(currentGoal["name"]),
      icon: new FormControl(iconName),
      goal: new FormControl(currentGoal["goal"]),
      savePerMonth: new FormControl(currentGoal["savingPerMonth"]),
      current: new FormControl(currentGoal["current"])
    });
    setTimeout(() => {
      const inputFocus = document.getElementById("edit-goal-name");
      inputFocus.focus();
    }, 1);
  }
  updateAtsAfterGoals() {
    this.budgetData.goalsTotal = this.budgetData.savings.reduce(
      (total, goal) => goal.savingPerMonth + total,
      0
    );
    this.atsAfterGoals =
      this.budgetData.amountToSave - this.budgetData.goalsTotal;
  }
  updateGoal() {
    let currentGoal = this.budgetData.savings.findIndex(
      (goal: object) => goal["id"] === this.updateGoalId
    );
    let iconName = this.iconNamesHashMap[this.editGoalForm.value.icon];
    this.budgetData.savings[currentGoal] = {
      id: this.updateGoalId,
      name: this.editGoalForm.value.name,
      icon: iconName,
      goal: parseInt(this.editGoalForm.value.goal),
      savingPerMonth: parseInt(this.editGoalForm.value.savePerMonth),
      current: parseInt(this.editGoalForm.value.current)
    };
    this.updateAtsAfterGoals();
    localStorage.setItem("savings", JSON.stringify(this.budgetData.savings));
    this.cancelEdit();
  }
}
