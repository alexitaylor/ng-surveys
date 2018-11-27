import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sb-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
  @Input() data: any;

  constructor() { }

  ngOnInit() {
  }

}
