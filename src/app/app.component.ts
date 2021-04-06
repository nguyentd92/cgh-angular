import { Component, OnInit } from '@angular/core';
import { interval, timer } from 'rxjs';
import { Job } from './_shared/models/job.model';
import { TasksService } from './_shared/services/tasks.service';
import { map } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { format, addDays } from 'date-fns';
import { Message } from './_shared/models/message.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  message: Message;

  constructor(private tasksService: TasksService) {

  }

  ngOnInit() {
    this.tasksService.message$.subscribe(
      message => {
        this.message = message
        setTimeout(() => this.message = null , 3*1000)
      }
    )
  }
}
