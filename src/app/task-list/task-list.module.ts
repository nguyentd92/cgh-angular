import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from './task-list.component';
import { RouterModule, Routes } from '@angular/router';
import { TaskItemComponent } from './task-item/task-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: TaskListComponent
  }
]

@NgModule({
  declarations: [
    TaskListComponent,
    TaskItemComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class TaskListModule { }
