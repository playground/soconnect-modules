import { Component, ViewChild, EventEmitter, OnDestroy, OnInit, Output, Input, ElementRef } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'soconnect-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit {
  @Input() minChar: number = 3;
  @Input() maxResult: number = 10;
  @Input() language: string = 'en_US';
  @Output() searchString: EventEmitter<string> = new EventEmitter();
  public searchTerms: Subject<any> = new Subject();

  @ViewChild('inputSearch') private inputSearch: ElementRef;

  constructor() { }

  ngOnInit(): void {
    this.inputSearch.nativeElement.focus();
    this.searchTerms
      .debounceTime(500)
      .distinctUntilChanged()
      .subscribe((newValue: string) => {
        this.search(newValue);
      });
  }

  ngOnDestroy(): void {
  }

  search(text: string) {
    if (text.length < this.minChar) {
      // do nothing
    } else {
      this.searchString.emit(result)
    }
  }

}
