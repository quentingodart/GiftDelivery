import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private userToken : string = "";

  private products : any = null;

  constructor(private http: HttpClient, private router: Router) {
    this.userToken = localStorage.getItem("userToken");
    this.getProducts();
  }

  ngOnInit() {
  }

  getProducts() {
    let httpOptions = {headers: new HttpHeaders({'Authorization': this.userToken})}
    this.http.get('/api/product', httpOptions).subscribe(resp => {
    this.products = resp;
    console.log("Récuprération des produits : " + this.products);
    console.log("Produit 1 : " + this.products[0].name);
  }, err => {
    console.log("Récupération produits erreur");
  });
  }
}
