import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { addDays, format } from 'date-fns';
import { Job } from '../_shared/models/job.model';
import { TasksService } from '../_shared/services/tasks.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private tasksService: TasksService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      deadline: [format(addDays(new Date(), 1), 'yyyy-MM-dd'), []]
    })

    const id = this.activatedRoute.snapshot.paramMap.get('id');

    this.tasksService.getById(+id).subscribe(
      res => this.form.patchValue({
        name: res.name,
        deadline: format(new Date(res.deadline), 'yyyy-MM-dd')
      })
    )
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

    this.tasksService.create(job).subscribe(
      res => {}
    )
  }

}
