import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap';

import { CurrencyPipe } from '@angular/common';

import { HttpService } from './shared/services/http/http.service';
import { NotificationService } from './shared/services/notification/notification.service';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { NotificationComponent } from './shared/components/notification/notification.component';
import { AdvertisingComponent } from './advertising/advertising.component';
import { CustomCurrencyPipe } from './shared/pipes/custom-currency/custom-currency.pipe';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    TransactionsComponent,
    NotificationComponent,
    AdvertisingComponent,
    CustomCurrencyPipe,
  ],
  providers: [
    HttpService,
    NotificationService,
    CurrencyPipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
