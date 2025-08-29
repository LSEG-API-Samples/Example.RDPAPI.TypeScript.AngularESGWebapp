import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { MatTableModule } from '@angular/material/table'  
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-esgdata',
  standalone: true,
  imports: [MatCardModule,FormsModule,ReactiveFormsModule,MatInputModule,MatTableModule,CommonModule],
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
