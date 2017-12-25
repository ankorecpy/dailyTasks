import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Observer } from '../../providers/models/Observer';
import { DailyTask } from '../../providers/dailyTask';

import { TaskPage } from '../task/task';

@Component({
  selector: 'page-tasks-list',
  templateUrl: 'tasks-list.html',
})
export class TasksListPage implements Observer {

  private day: number;
  private month: number;
  private year: number;
  private monthName: String;
  private creationPermission: boolean;
  private tasksList: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillEnter() {
    this.day = this.navParams.get('day');
    this.month = this.navParams.get('month');
    this.year = this.navParams.get('year');
    this.monthName = this.navParams.get('monthName');
    this.creationPermission = this.navParams.get('creationPermission');
  }

  //send to TaskPage with a activated creation flag and empty datas
  private goToCreeateTask(): void {
    this.navCtrl.push(TaskPage, { name: "", progress: "0", difficulty: 1, note: "", mode: true });
  }

  //send to TaskPage with a deactivated creation flag and datas of a selected task
  private goToModifyTask(task: DailyTask): void {
    this.navCtrl.push(TaskPage, { id: task.getId(), name: task.getName(), progress: task.getProgress(), difficulty: task.getDifficultyLevel(), note: task.getNote(), mode: false });
  }

  //method implemented for wiew with last changes, this is an Observer realization
  public update(element: any) {
    this.tasksList = element;
  }

}
