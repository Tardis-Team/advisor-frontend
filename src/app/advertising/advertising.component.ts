import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Advertisement, AdvertisementType } from '../shared/models/advertisement.model';

@Component({
  selector: 'app-advertising',
  templateUrl: './advertising.component.html',
  styleUrls: ['./advertising.component.css']
})
export class AdvertisingComponent implements OnInit {
  @Output() callback = new EventEmitter<any>();
  @Input() data: Advertisement;
  @Input() type: string;

  constructor() {
    console.log(this.data, this.type)
  }

  public onBtnClick() {
    this.callback.emit({ isFired: true });
  }

  ngOnInit() {
  }

}
