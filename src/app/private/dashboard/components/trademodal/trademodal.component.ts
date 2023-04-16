import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trademodal',
  templateUrl: './trademodal.component.html',
  styleUrls: ['./trademodal.component.scss'],
})
export class TrademodalComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  toNumber(text: string) {
    return Number(text);
  }
}
