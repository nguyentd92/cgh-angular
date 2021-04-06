import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { addDays, format } from 'date-fns';
import { Job } from '../_shared/models/job.model';
import { TasksService } from '../_shared/services/tasks.service';

@Component({
  selector: 'app-form-add-task',
  templateUrl: './form-add-task.component.html',
  styleUrls: ['./form-add-task.component.scss']
})
export class FormAddTaskComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private tasksService: TasksService,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      deadline: [format(addDays(new Date(), 1), 'yyyy-MM-dd'), []]
    })
  }


  formControl(controlName: string) {
    return this.form.controls[controlName]
  }

  resetForm(): void {
    this.form.patchValue({
      name: '',
      deadline: format(addDays(new Date(), 1), 'yyyy-MM-dd')
    });
  }

  add() {
    // Kiểm tra form có hợp lệ
    if(this.form.invalid) {
      return;
    }

    const job = new Job();
    const { name, deadline } = this.form.value;

    job.name = name;
    job.deadline = new Date(deadline);
    job.doneAt = null;

    this.tasksService.create(job).subscribe(
      res => {}
    )
  }
}
