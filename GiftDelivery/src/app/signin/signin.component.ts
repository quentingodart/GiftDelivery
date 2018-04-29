import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  private lastname : string = "";
  private firstname : string = "";
  private username : string = "";
  private email : string = "";
  private password : string = "";
  private confirmPassword : string = "";

  private message : string = "";

  constructor(private router: Router) { }

  ngOnInit() {
  }

  signin() {
    if (this.lastname != "" && this.firstname != "" && this.username != ""
        && this.email != "" && this.password != "" && this.confirmPassword != "") {
          this.message = null;
          if (this.password == this.confirmPassword) {
            console.log("lastname : " + this.lastname + " firstname : " + this.firstname + " username : " + this.username + " email : " +
            this.email + " password : " + this.password + " confirmPassword : " + this.confirmPassword);
            this.message = null;
            this.router.navigate(["/accueil"]);
          }
          else {
            this.message = "Les deux mots de passe doivent être identiques.";
          }
    }
    else {
      this.message = "Vous devez renseigner tous les champs.";
    }
  }

}
