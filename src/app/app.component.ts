import { Component } from '@angular/core';
import { Task } from 'app/model/task';
import { NewTaskComponent } from './new-task/new-task.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  task: any = 1

  constructor(public newTask: NewTaskComponent) {}

  openDialog() {
    this.newTask.openDialog(this.task)
  }
}
