import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {ErrorStateMatcher} from '@angular/material/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common'; 


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
    standalone: true,
   imports: [MatIconModule,MatFormFieldModule,MatInputModule,MatCardModule,FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['../app.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  isSuccess = false;
  errorMsg = '';
  matcher = new MyErrorStateMatcher();

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username : [null, Validators.required],
      password : [null, Validators.required],
      appkey : [null, Validators.required]
    });
  }

  onFormSubmit(): void {
    this.authService.login(this.loginForm.value)
      .subscribe(() => {
        this.isSuccess = true;
        this.errorMsg = '';
        this.router.navigate(['/esg']).then(_ => console.log('You are secure now!'));
      }, (err: any) => {
        console.log('onFormSubmit Error>>>', err );
        this.isSuccess = false;
        this.errorMsg = err.error.error + ',' + err.error.error_description;
      });
  }
  clearErrorMsg(): void {
    this.isSuccess = false;
    this.errorMsg = '';
  }



}
