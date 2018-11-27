import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sb-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {
  @Input() data: any;

  constructor() { }

  ngOnInit() {
  }

}
