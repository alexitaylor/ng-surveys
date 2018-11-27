import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sb-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss']
})
export class RadioComponent implements OnInit {
  @Input() data: any;

  constructor() { }

  ngOnInit() {
  }

}
