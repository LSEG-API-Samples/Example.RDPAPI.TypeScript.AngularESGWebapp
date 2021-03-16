import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-esgdata',
  templateUrl: './esgdata.component.html',
  styleUrls: ['./esgdata.component.scss']
})

export class EsgdataComponent implements OnInit {

  @Input()
  hasData = false;
  @Input()
  esgList: any[] = [];
  @Input()
  columnHeaders: string[] = [];
  @Input()
  universeList: any[] = [];
  @Input()
  universeHeaders: string[] = [];
  constructor() { }
  ngOnInit(): void {

  }

}
