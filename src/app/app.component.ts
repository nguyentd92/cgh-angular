import { Component } from '@angular/core';
import { Job } from './_shared/models/job.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  inputName = '';
  inputDate = null;

  backgroundColor = 'red';

  jobs: Array<Job> = [
    {
      name: 'Làm bài tập James',
      deadline: new Date(2021, 3, 1, 10)
    },
    {
      name: 'Làm bài tập Angular',
      deadline: new Date(2021, 3, 4, 10)
    },
    {
      name: 'Làm bài tập ASP.NET',
      deadline: new Date(2021, 3, 10, 10)
    }
  ]

  page = 1;

  get jobPage() {
    return this.jobs.slice(this.page * 10, (this.page + 1) * 10)
  }

  constructor() {
  }

  // onInputNameChange($event: any) {
  //   this.inputName = $event.target.value
  // }

  // onInputDateChange($event: any) {
  //   this.inputDate = $event.target.value
  // }

  delete(job: Job): void {
    // Confirm xóa hay không
    if(!confirm('Bạn có muốn xóa?')) return;

    // Xóa phần tử khỏi danh sách
    this.jobs = this.jobs.filter(element => element != job);
  }

  add() {
    const job = new Job();
    job.name = this.inputName;
    job.deadline = new Date(this.inputDate);

    this.jobs.push(job);
  }
}
