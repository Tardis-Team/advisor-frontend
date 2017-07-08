import { Component, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Notification } from '../../models/notification.model';
import { NotificationService } from '../../services/notification/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnDestroy {
  public notification: Notification;
  private subscription: Subscription;

  constructor(private notificationService: NotificationService, private ref: ChangeDetectorRef) {
    this.subscription = this.notificationService.get().subscribe((notification: Notification) => {
      this.notification = notification;
      this.ref.detectChanges();
    });
  }

  remove(notification: Notification) {
    this.notification = null;
    this.ref.detectChanges();
  }

  onClick(notification: Notification) {
    notification.onClick();
    this.ref.detectChanges();
    this.remove(notification);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
