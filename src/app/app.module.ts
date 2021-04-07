import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormAddTaskComponent } from './form-add-task/form-add-task.component';
import { RouterModule, Routes } from '@angular/router';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { AppLayoutComponent } from './_shared/components/app-layout/app-layout.component';
import { AuthService } from './_shared/services/auth.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: 'add',
        component: FormAddTaskComponent
      },
      {
        path: 'task-item/:id',
        component: EditTaskComponent
      },
      {
        path: 'list',
        loadChildren: () => import('./task-list/task-list.module')
          .then(m => m.TaskListModule)
      },
    ],
    canActivate: [AuthService]
  },
  {
    path: '**',
    redirectTo: 'list',
    pathMatch: 'full'
  }
]

@NgModule({
  declarations: [
    AppComponent,
    FormAddTaskComponent,
    EditTaskComponent,
    AppLayoutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
