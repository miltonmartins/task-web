import { Component, OnInit } from '@angular/core';
import { NewTaskComponent } from 'app/new-task/new-task.component';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Task } from 'app/model/task';

@Component({
  selector: 'tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  private tasks: Task[]
  collection: AngularFirestoreCollection<Task>

  constructor(private readonly aft: AngularFirestore, public newTask: NewTaskComponent) {
    this.collection = aft.collection('Task')
    const collection$: Observable<Task[]> = this.collection.valueChanges()
    collection$.subscribe(data => this.tasks = data)
  }

  deleteTask(id: string) {
    this.collection.doc(id).delete()
  }

  updateTask(task: Task) {
    this.newTask.openDialog(task)
  }

  ngOnInit() {
  }

}
