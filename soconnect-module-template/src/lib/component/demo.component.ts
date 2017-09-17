import { Component, OnInit } from '@angular/core';

import { LibDemoService } from '../service/demo.service';
@Component({
  selector: 'lib-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class LibDemoComponent implements OnInit {
  answer: number;
  constructor(private libDemoService: LibDemoService) {

  }

  ngOnInit() {
    this.answer = this.libDemoService.getMeaning();
  }

}
