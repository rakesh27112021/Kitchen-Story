import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { admin } from 'src/app/models/admin';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  adminLoginForm: FormGroup;
  admin : admin | undefined
  constructor(
    private fb: FormBuilder,
    private api : ApiService,
    private router : Router
  ) { 

    this.adminLoginForm = this.fb.group({
      uname: ['admin', Validators.required],
      password: ['admin', Validators.required]
    })
  }

  ngOnInit(): void {
  }
  
  validateUser(){
    this.api.adminlogin(this.adminLoginForm.value).subscribe(
      (Response) => {
        console.log(Response);
        var info=JSON.parse(JSON.stringify(Response));
        console.log (info['username']);
        console.log (info['welcomemassage']);
        if (info['username']=="admin"){
          this.router.navigate(["/admin/dashboard"]);
        }

        localStorage.setItem("currentAdminUser",info['username'])
        
      },
      (err) => {
        console.log(err)}
    )
  }
}
