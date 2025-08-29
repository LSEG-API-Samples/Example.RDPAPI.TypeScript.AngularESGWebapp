import { Component, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
   imports: [MatIconModule,MatCardModule,RouterModule],
  templateUrl: './not-found.component.html',
  styleUrls: ['../app.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
