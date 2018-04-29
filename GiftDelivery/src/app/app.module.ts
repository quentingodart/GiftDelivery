import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {HttpModule} from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutComponent } from './dashboard/layout/layout.component';
import { HeaderComponent } from './dashboard/layout/header/header.component';
import { FooterComponent } from './dashboard/layout/footer/footer.component';


const appRoutes : Routes = [
  {
    path: '',
    redirectTo : '/accueil',
    pathMatch : 'full'
  },
  {
    path: 'accueil',
    component: DashboardComponent,
    data: { title: 'Accueil' }
  },
  {
    path: 'connexion',
    component: LoginComponent,
    data: { title: 'Connection' }
  },
  {
    path: 'inscription',
    component: SigninComponent,
    data: { title: 'Inscription' }
  },
  { path: '**', component: DashboardComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SigninComponent,
    DashboardComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    RouterModule.forRoot(
    appRoutes,
    { enableTracing: true } // <-- debugging purposes only
  ),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
