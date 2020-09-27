import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  invalidLogin:boolean;
  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
  }
  login(form: NgForm) {

    const credentials = JSON.stringify(form.value);
    console.log(credentials);
    var data = {
      client_id :'password.client',
      client_secret:'511536EF-F270-4058-80CA-1C89C192F69A',
      grant_type:'password',
      username:'bob',
      password:'bob'
    }

var bb="client_id=password.client&client_secret=511536EF-F270-4058-80CA-1C89C192F69A&grant_type=password&username=bob&password=bob";



    this.http.post("https://localhost:5001/connect/token", bb, {
      headers: new HttpHeaders({
        "Content-Type": "application/x-www-form-urlencoded"
      })
    }).subscribe(response => {
      const token = (<any>response).access_token;

      console.log(response);
      localStorage.setItem("jwt", token);
      this.invalidLogin = false;

      this.router.navigate(["/"]);
    }, err => {
      this.invalidLogin = true;
    });
  }
}
