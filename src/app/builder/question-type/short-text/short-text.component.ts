import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'sb-short-text',
  templateUrl: './short-text.component.html',
  styleUrls: ['./short-text.component.scss']
})
export class ShortTextComponent implements OnInit {
  @Input() data: any;

  constructor() { }

  ngOnInit() {
  }

}
