import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http'
import { Http, Headers } from '@angular/http'

import { CPanelClientPage } from '../cpanel-client/cpanel-client';
import { RegisterPage } from '../register/register';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController) {

  }

  

  login() {
    this.navCtrl.push(CPanelClientPage);
  }

    gotoRegister() {
      this.navCtrl.push(RegisterPage);
    }
}
