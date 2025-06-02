
export class Games {
  constructor() {
    this.countActivities = 0;
    this.ActivitiesCompleted = [false, false, false];
    this.Complete = false;
  }

  validationActivities(index) {
    this.countActivities++;
    this.ActivitiesCompleted[index] = true;
    if (this.ActivitiesCompleted.every(activity => activity)) {
      document.getElementById("mensajeFinal").textContent = "🎉 ¡Has completado todas las actividades!";
      this.Complete = true;
    }
  }

  getCountActivities() {
    return this.countActivities;
  }

  getActivitiesCompleted(position) {
    return this.ActivitiesCompleted[position];
  }
}