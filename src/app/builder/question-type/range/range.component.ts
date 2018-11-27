import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sb-range',
  templateUrl: './range.component.html',
  styleUrls: ['./range.component.scss']
})
export class RangeComponent implements OnInit {
  @Input() data: any;

  constructor() { }

  ngOnInit() {
  }

}
