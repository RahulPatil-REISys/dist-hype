import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NetworkService } from 'src/app/service/network.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm;

  constructor(private router: Router, 
    private fb: FormBuilder,
    private networkService:NetworkService) { 

    if(1){ //check already login and redirect to dashboard
      console.log('login');
      // router.navigateByUrl('/dashboard');
    }

    this.initFormValue();

  }

  initFormValue(){
    this.loginForm = this.fb.group({
      username: ['',Validators.required],
      password: ['',Validators.required],
    });
  }

  ngOnInit(): void {
  }

  login(){
    console.log(this.loginForm.value);
    this.networkService.login(this.loginForm.value)
    .subscribe((res) => {
      localStorage.setItem('user',JSON.stringify(res));
      this.router.navigateByUrl('/landing');
    },(err) => {
      this.router.navigateByUrl('/login');
      console.log('Login Error');
    })
  }
}
