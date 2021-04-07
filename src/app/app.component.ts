import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription, timer } from 'rxjs';
import { Job } from './_shared/models/job.model';
import { TasksService } from './_shared/services/tasks.service';
import { map } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { format, addDays } from 'date-fns';
import { Message } from './_shared/models/message.model';
import { AuthService } from './_shared/services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  message: Message;

  subs: Subscription;

  constructor(
    private tasksService: TasksService,
    private authService: AuthService
  ) {

  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  get authUser$() {
    return this.authService.authUser$;
  }

  ngOnInit() {
    this.subs = this.tasksService.message$.subscribe(
      message => {
        this.message = message
        setTimeout(() => this.message = null , 3*1000)
      }
    )
  }
}
