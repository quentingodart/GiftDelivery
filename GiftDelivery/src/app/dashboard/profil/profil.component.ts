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
  private username : string = "";

  private user : any;

  constructor(private http: HttpClient, private router: Router) {

    this.userToken = localStorage.getItem("userToken");
    this.username = localStorage.getItem("username");
    //this.getUser();
   }

  ngOnInit() {
<<<<<<< HEAD
  }

private Data = {username:''};
  getUser() {
    this.http.get('/api/me', {params: {username : this.username}}).subscribe(resp => {
    this.user = resp;
    console.log("Récuprération de l'utilisateur : " + this.user);
    console.log("User1 : " + this.user.username);
  }, err => {
    console.log("Récupération profil erreur");
=======
  this.http.get('/api/me', {params: {username:this.username}}).subscribe(data => {
    this.user = data;
    console.log(this.user);
  }, err => {
    if(err.status === 401) {
      console.log("Récupération profil erreur");
    }
>>>>>>> d2e9a2a32c466966aca73a0db2d33b15c92116be
  });
  }
}
