import { Injectable, Inject } from '@angular/core';
import { Http, Request, RequestMethod, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';
import { DOCUMENT } from '@angular/platform-browser';
import 'rxjs/add/operator/map';
import 'eventsource';

import { Transaction } from '../../models/transaction.model';
import { Statistic } from '../../models/statistic.model';
import { Advertisement } from '../../models/advertisement.model';

declare let EventSource: any;

@Injectable()
export class HttpService {
  private url: string;
  public constructor(protected http: Http, @Inject(DOCUMENT) document: any) {
    this.url = `${document.location.origin}/api/users/admin/`;
  }

  loadTransactionsStream(): Observable<Transaction> {
    return Observable.create(observer => {
      const eventSource = new EventSource(`${this.url}transactions/`);

      eventSource.onmessage = (raw) => observer.next(JSON.parse(raw.data));
    });
  }

  loadPlannedTransactions(): Observable<Transaction[]> {
    return this.http.get(`${this.url}transactions/upcoming/`)
      .map((res: Response) => res.json());
  }

  loadStatistic(): Observable<Statistic[]> {
    return this.http.get(`${this.url}statistic/`)
      .map((res: Response) => res.json());
  }

  loadAdvertisement(): Observable<Advertisement[]> {
    return this.http.get(`${this.url}advises/`)
      .map((res: Response) => res.json());
  }
}
