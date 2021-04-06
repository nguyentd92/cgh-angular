import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Job } from '../models/job.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private httpClient: HttpClient) { }

  getList(): Observable<Job[]> {
    return this.httpClient
      .get('https://60653fd5f09197001778737e.mockapi.io/tasks')
      .pipe(map(res => res as Job[]));
  }

  getById(id: number): Observable<Job> {
    return this.httpClient.get('https://60653fd5f09197001778737e.mockapi.io/tasks/' + id)
      .pipe(map(res => res as Job))
  }

  create(job: Partial<Job>): Observable<Job> {
    return this.httpClient.post('https://60653fd5f09197001778737e.mockapi.io/tasks', job)
      .pipe(map(res => res as Job));
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete('https://60653fd5f09197001778737e.mockapi.io/tasks/' + id);
  }
}
