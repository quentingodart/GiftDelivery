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

  private searchedProduct : any = null;
  private searchContent : string = "";

  constructor(private http: HttpClient, private router: Router) {
    this.userToken = localStorage.getItem("userToken");
    this.getProducts();
  }

  ngOnInit() {
  }

  getProducts() {
    this.http.get('/api/product').subscribe(resp => {
    this.products = resp;
  }, err => {
    console.log("Récupération produits erreur");
  });
  }

  searchProduct() {
    this.searchedProduct = null;
    this.http.get('/api/product/search', {params: {name: this.searchContent}}).subscribe(data => {
      this.searchedProduct = data;
    }, err => {
      if(err.status === 401) {
        console.log("Récupération produit recherché erreur");
      }
    });
    }
}
