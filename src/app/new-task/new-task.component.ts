import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Task } from 'app/model/task';

@Component({
  selector: 'new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})

export class NewTaskComponent implements OnInit {
   collection: AngularFirestoreCollection<Task>
   id: any
   task: Task
   date: string
   check: boolean
   hasTask: boolean

  constructor(private readonly aft: AngularFirestore, public dialog: MatDialog) {
    this.collection = aft.collection('Task')
    this.id = aft.createId();
    const collection$: Observable<Task[]> = this.collection.valueChanges()
    //retorna array de objetos e nao um task
   }

  ngOnInit() {}

  openDialog(taskUpdated: any): void {
    if(taskUpdated.description != undefined) {
      if(taskUpdated.status == "true" {
        this.check = true
      } else {
        this.check = false
      }

      this.hasTask = true
      //let dateString = '1968-11-16T00:00:00'
      //let newDate = new Date(taskUpdated.dueDate +"T00:00:00");

      let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
        width: '280px',
        data: {description: taskUpdated.description, dueDate: taskUpdated.dueDate, status: this.check, priority: taskUpdated.priority, id: taskUpdated.id}
      });
    } else {
      let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
        width: '280px',
        data: {}
      });
    }

   dialogRef.afterClosed().subscribe(result => {
    if(result !== undefined) {
      this.task = result

      if(result.status)
        this.task.status = result.status.toString()
      else
        this.task.status = "false"

      this.date = result.dueDate.getDate() + "/" + (result.dueDate.getMonth()+1)  + "/" + result.dueDate.getFullYear()
      this.task.dueDate = this.date
    }

    if(this.hasTask == true) {
      this.updateTask()
      this.hasTask = false
    } else {
      this.newTask()
    }
  });
 }

  newTask() {
    this.task.id = this.id
    this.collection.add(this.task)
  }

  updateTask() {
    console.log(this.task)
    this.collection.doc(this.task.id).update(this.task)
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './new-task.component.html',
})

export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
