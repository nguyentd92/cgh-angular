import { Component, OnInit } from '@angular/core';
import { interval, timer } from 'rxjs';
import { Job } from './_shared/models/job.model';
import { TasksService } from './_shared/services/tasks.service';
import { map } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { format, addDays } from 'date-fns';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


}
