import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sb-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss']
})
export class DateComponent implements OnInit {
  @Input() data: any;
  isView: boolean;

  constructor() { }

  ngOnInit() {
    this.isView = this.data.isView;
  }
}
