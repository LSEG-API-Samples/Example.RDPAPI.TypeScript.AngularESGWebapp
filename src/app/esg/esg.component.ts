import { Component, Input, OnInit, Output } from '@angular/core';
import {AuthService} from '../auth.service';
import {TokenService} from '../token.service';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {EsgService} from '../esg.service';
import {EsgdataComponent} from '../esgdata/esgdata.component';
import {MatIconModule} from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table'  
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common'; 
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-secure',
   standalone: true,
   imports: [MatIconModule,MatTableModule,MatFormFieldModule,FormsModule,ReactiveFormsModule,MatCardModule,EsgdataComponent,CommonModule,MatInputModule],
  templateUrl: './esg.component.html',
  styleUrls: ['../app.component.scss']
})
export class EsgComponent implements OnInit {

  message = '';
  searchForm!: FormGroup;
  searchKeyword = '';
  hasData = false;
  columnHeaders: string[] = [];
  esgList: any[] = [];
  universeList: any[] = [];
  universeHeaders: string[] = [];
  constructor(private authService: AuthService, private tokenService: TokenService, private esgService: EsgService,
    private router: Router, private formBuilder: FormBuilder) {
    console.log("Token: "+tokenService.getToken());
  }

  ngOnInit(): void {
      this.hasData = false;
      this.searchForm = this.formBuilder.group({
      searchKeyword : [null, Validators.required]
    });

      this.message = `Hello ${this.tokenService.getUsername()}`;
  }
  clearData(): void
  {
    this.hasData = false;
    this.columnHeaders = [];
    this.esgList = [];
    this.universeList = [];
    this.universeHeaders = [];
  }
  onSearchSubmit(): void
  {
      this.clearData();
      this.esgService.searchEsg(this.searchForm.value.searchKeyword).subscribe((searchData: any) =>
      {
        if ( searchData.error )
        {
          console.log('Found Error:', searchData.error.description);
          const formControl = this.searchForm.get('searchKeyword');
          if (formControl) {
            // activate the error message
            formControl.setErrors({
              serverError: searchData.error.description
            });
          }

          this.hasData = false;
          this.columnHeaders = [];
          this.esgList = [];
        }
        else
        {

          if (searchData.links.count > 0)
          {
            this.hasData = true;
            let universeIndex = 0;
            searchData.universe.forEach((universeData: any) =>
            {
              this.universeList[universeIndex++] = universeData;
            });

            this.universeHeaders = Object.keys(this.universeList[0]);
            this.columnHeaders = searchData.headers.map((data: any) => data.title);

            let rowIndex = 0;
            searchData.data.forEach((dataRow: any[]) => {
                let columnIndex = 0;
                this.esgList[rowIndex] = {};
                searchData.headers.forEach((header: any) =>
                {
                    this.esgList[rowIndex][header.title] = dataRow[columnIndex];
                    columnIndex++;
                });
                rowIndex++;
            });
            // console.log(this.esgList);
            this.hasData = true;
          }else{
            const formControl = this.searchForm.get('searchKeyword');
            if (formControl) {
              // activate the error message
              formControl.setErrors({
                serverError : 'No Data'
              });
            }
          }
        }

      }, error => {
        console.log('Found Error', error);
      });
  }
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']).then(_ => console.log('Logout'));
  }

}
