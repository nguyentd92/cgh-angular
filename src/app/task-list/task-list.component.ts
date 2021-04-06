import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';
import { Job } from '../_shared/models/job.model';
import { TasksService } from '../_shared/services/tasks.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  jobs: Array<Job> = []

  page = 1;

  sort: 'asc' | 'desc' = 'asc';

  constructor(
    private tasksService: TasksService,
  ) {
  }

  get jobPage(): Job[] {
    const jobsToShow = [...this.jobs];

    if(this.sort === 'desc') {
      jobsToShow.reverse();
    }

    return jobsToShow;
  }


  ngOnInit(): void {
    this.fetchTaskList();
  }


  fetchTaskList() {
    this.tasksService.getList().subscribe(
      result => this.jobs = result,
      errors => {},
      () => {}
    )
  }

  delete(job: Job): void {
    // Confirm xóa hay không
    if(!confirm('Bạn có muốn xóa?')) return;

    // Xóa phần tử khỏi danh sách
    this.tasksService.delete(job.id).subscribe(
      _ => {
        this.jobs = this.jobs.filter(e => e != job);
      }
    )
  }


}
