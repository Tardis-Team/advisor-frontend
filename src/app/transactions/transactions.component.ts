import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectorRef, trigger, state, transition, style, animate } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/forkJoin';

import { ModalDirective } from 'ngx-bootstrap/modal';

import { HttpService } from '../shared/services/http/http.service';
import { NotificationService } from '../shared/services/notification/notification.service';

import { Transaction, TransactionType, TransactionKind } from '../shared/models/transaction.model';
import { Statistic } from '../shared/models/statistic.model';
import { Advertisement, AdvertisementKind } from '../shared/models/advertisement.model';
import { State } from '../shared/models/state.model';

const spendOverview = {
  title: 'Try Cashback shopping',
  description: 'Get cashback and save money on lots of products and services',
  type: 'SPEND',
  btn: 'Spend safely',
};

const investOverview = {
  title: 'Explore Investment Options',
  description: 'Savings and investments can be a good way to provide for your financial future',
  type: 'INVEST',
  btn: 'Invest safely',
};

const NotificationText = 'Your salary has arrived!';
const NotificationLinkText = 'PFM advice ready (click!)';

@Component({
  selector: 'app-transactions',
  animations: [
    trigger('enterTrigger', [
      state('fadeIn', style({
        opacity: '1'
      })),
      transition('void => *', [style({ opacity: '0' }), animate('500ms')])
    ])
  ],
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit, OnDestroy {
  @ViewChild('modal') public modal: ModalDirective;

  public transactions: Transaction[];
  public plannedTransactions: Transaction[];
  public handledTransaction: Transaction;
  public statistic: Statistic[];
  public advertisement = { spend: [], invest: [] };
  public isLoading: boolean;
  public state: number;
  private stream: Subscription;

  constructor(private apiService: HttpService, private notificationService: NotificationService, private ref: ChangeDetectorRef) {
    this.state = 1;
    this.isLoading = false;
    this.transactions = [];
  }

  private loadAdditionalData() {
    Observable.forkJoin(
      this.apiService.loadPlannedTransactions(),
      this.apiService.loadAdvertisement(),
      this.apiService.loadStatistic(),
    ).subscribe((raw) => {
      this.plannedTransactions = raw[0].map((transaction) => {
        transaction.kind = TransactionKind[transaction.categoryCode];
        return transaction;
      });

      raw[1].forEach((adv) => {
        switch (adv.type) {
          case AdvertisementKind.SPEND:
            this.advertisement.spend.push(adv);
            break;

          default:
            this.advertisement.invest.push(adv);
            break;
        }
      });

      this.statistic = raw[2];

      this.isLoading = false;
      this.ref.detectChanges();
    })
  }

  public openModal() {
    this.modal.show();
    this.ref.detectChanges();
    this.loadAdditionalData();
  }

  public goToAdvises1(event: any) {
    if (event.isFired) {
      this.state = 2;
    }
  }

  public goToAdvises2(event: any) {
    if (event.isFired) {
      this.state = 3;
    }
  }

  public goToBack() {
    this.state = 1;
  }

  get State() {
    return State;
  }

  get advOverviews() {
    return { invest: investOverview, spend: spendOverview };
  }

  public resetState() {
    this.stream.unsubscribe();
    this.transactions = [];
    this.plannedTransactions = [];
    this.statistic = [];
    this.advertisement.invest = [];
    this.advertisement.spend = [];
    this.handledTransaction = null;
    this.isLoading = false;
    this.state = 1;
    this.ref.detectChanges();
  }

  ngOnInit() {
    this.isLoading = true;
    this.stream = this.apiService.loadTransactionsStream().subscribe((transaction) => {
      if (transaction) {
        this.transactions.push(transaction);
        if (transaction.type === TransactionType.CREDIT && !this.modal.isShown) {
          this.handledTransaction = transaction;

          this.notificationService.create(NotificationText, NotificationLinkText, () => {
            this.openModal();
          });

        }
      }
    });
  }

  ngOnDestroy() {
    this.resetState();
  }

}
