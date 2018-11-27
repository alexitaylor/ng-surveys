import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sb-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss']
})
export class RadioComponent implements OnInit {
  @Input() data: any;

  radioOptions = [1];
  isPageNavChecked = false;

  constructor() { }

  ngOnInit() {
  }

  togglePageNavChecked(e) {
    this.isPageNavChecked = e.target.checked;
    console.log('this.isPageNavChecked: ', this.isPageNavChecked);
  }

}
