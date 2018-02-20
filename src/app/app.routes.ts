import { Routes } from '@angular/router'

import { TasksComponent } from './tasks/tasks.component'
import { NewTaskComponent } from './new-task/new-task.component'

export const ROUTES: Routes = [
  { path: '',
    redirectTo: '/tasks',
    pathMatch: 'full'
  },
  { path: 'tasks', component: TasksComponent }
]
