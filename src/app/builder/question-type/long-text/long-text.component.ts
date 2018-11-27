import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sb-long-text',
  templateUrl: './long-text.component.html',
  styleUrls: ['./long-text.component.scss']
})
export class LongTextComponent implements OnInit {
  @Input() data: any;

  constructor() { }

  ngOnInit() {
  }

}
