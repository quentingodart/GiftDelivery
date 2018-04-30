import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private signup : boolean = false;
  private username : string = "";

  constructor() {
    if (localStorage.getItem("userToken")) {
      this.signup = true;
      this.username = localStorage.getItem("username");
    }
    else
      this.signup = false;
  }

  ngOnInit() {
  }

  disconnect() {
    localStorage.removeItem("userToken");
    localStorage.removeItem("username");
    window.location.reload();
  }
}
