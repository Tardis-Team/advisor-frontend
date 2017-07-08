import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Notification } from '../../models/notification.model';

@Injectable()
export class NotificationService {
  private subject: Subject<Notification>;

  constructor() {
    this.subject = <Subject<Notification>>new Subject();
  }

  get(): Observable<any> {
    return this.subject.asObservable();
  }

  public create(message: string, linkText: string, onClick: Function = () => {}) {
    this.subject.next({ message: message, linkText: linkText, onClick: onClick });
  }

  clear() {
    this.subject.next();
  }

}
