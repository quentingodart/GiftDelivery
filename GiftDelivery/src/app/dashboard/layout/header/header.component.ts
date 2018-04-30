import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private signup : boolean = false;

  constructor() {
    if (localStorage.getItem("userToken"))
      this.signup = true;
    else
      this.signup = false;
  }

  ngOnInit() {
  }

  disconnect() {
    localStorage.removeItem("userToken");
    window.location.reload();
  }
}
