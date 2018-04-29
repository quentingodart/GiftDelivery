import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private loginUsername : string = "";
  private loginPassword : string = "";

  private message : string = "";

  constructor(private router: Router) { }

  ngOnInit() {
  }

  login() {
    console.log("loginUsername : [" + this.loginUsername + "] + loginPassword : [" + this.loginPassword + "]");
    if (this.loginUsername != "" && this.loginPassword != "") {
      this.message = null;
      this.router.navigate(["/accueil"]);
    }
    else {
      this.message = "Veuillez renseigner les champs.";
    }
  }
}
