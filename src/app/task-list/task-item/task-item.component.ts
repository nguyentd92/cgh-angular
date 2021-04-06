import { Component, EventEmitter, Input, OnInit, Output, HostBinding } from '@angular/core';
import { Job } from 'src/app/_shared/models/job.model';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit {
  @Input() job: Job;
  @Output() onDelete = new EventEmitter<Job>();

  constructor() { }

  ngOnInit(): void {
  }

  @HostBinding('class.is-done') get isDone(): boolean {
    return !!this.job.doneAt;
  }

  onClickDelete() {
    this.onDelete.emit(this.job);
  }

  onChangeCheckDone($event) {
    this.job.doneAt = $event ? new Date() : null;
  }
}
