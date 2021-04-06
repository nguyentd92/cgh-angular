import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Job } from '../models/job.model';
import { catchError, map, tap } from 'rxjs/operators';
import { Message, MessageType } from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  protected messageSubject: Subject<Message> = new Subject<Message>();

  constructor(private httpClient: HttpClient) { }

  get message$(): Observable<Message> {
    return this.messageSubject.asObservable();
  }

  protected emitMessage(message: Message) {
    this.messageSubject.next(message);
  }

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
      .pipe(
        tap((res) => this.emitMessage({ type: MessageType.Success, content: 'Create task successfully' })),
        catchError(error => {
          this.emitMessage({ type: MessageType.Error, content: 'Create Failed'})
          throw error;
        }),
        map(res => res as Job)
      );
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete('https://60653fd5f09197001778737e.mockapi.io/tasks/' + id);
  }
}
