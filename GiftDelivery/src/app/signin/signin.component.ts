import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

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

  private signupData = { username:'', firstname:'', lastname:'', email:'', password:'' };
  private message : string = "";

constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  signin() {
    if (this.lastname != "" && this.firstname != "" && this.username != ""
        && this.email != "" && this.password != "" && this.confirmPassword != "") {
          this.message = null;
          if (this.password == this.confirmPassword) {

            this.message = null;

            this.signupData = {username:this.username, firstname:this.firstname,
              lastname:this.lastname, email:this.email, password:this.password};
            this.http.post('/api/signup',this.signupData).subscribe(resp => {
            this.router.navigate(["/accueil"]);
          }, err => {
            this.message = err.error.msg;
          });

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
