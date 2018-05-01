import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  private userToken : string = "";

  private user : any = null;

  constructor(private http: HttpClient, private router: Router) {

    this.userToken = localStorage.getItem("userToken");
    this.getUser();
   }

  ngOnInit() {
  }

  getUser() {
    let httpOptions = {headers: new HttpHeaders({'Authorization': this.userToken})}
    this.http.get('/api/me', httpOptions).subscribe(resp => {
    this.user = resp;
    console.log("Récuprération de l'utilisateur : " + this.user);
    console.log("User1 : " + this.user[0].username);
  }, err => {
    console.log("Récupération profil erreur");
  });
  }
}
