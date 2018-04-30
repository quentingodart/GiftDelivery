import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private loginUsername : string = "";
  private loginPassword : string = "";

  private message : string = "";
  private loginData = { username:'', password:'' };
  private data: any;

constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  login() {
    console.log("loginUsername : [" + this.loginUsername + "] + loginPassword : [" + this.loginPassword + "]");
    if (this.loginUsername != "" && this.loginPassword != "") {

      this.message = null;

      this.loginData = { username:this.loginUsername, password:this.loginPassword };
      this.http.post('/api/signin',this.loginData).subscribe(resp => {
      this.data = resp;
      localStorage.setItem('userToken', this.data.token);

      this.router.navigate(["/accueil"]);

    }, err => {
      this.message = err.error.msg;
    });

    }
    else {
      this.message = "Veuillez renseigner les champs.";
    }
  }
}
