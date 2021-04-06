import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Message, MessageType } from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  messageSubject: Subject<Message> = new Subject<Message>();

  constructor() { }

  get message$(): Observable<Message> {
    return this.messageSubject.asObservable();
  }

  success(message: string): void {
    this.messageSubject.next({
      type: MessageType.Success,
      content: message
    })
  }
}
