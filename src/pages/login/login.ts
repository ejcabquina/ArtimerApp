import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http'
import { Http, Headers } from '@angular/http'

import { CPanelClient } from '../cpanel-client/cpanel-client';
import { Register } from '../register/register';



@Component({
  selector: 'login-page',
  templateUrl: 'login.html'
})
export class Login {

  constructor(public navCtrl: NavController) {

  }

  

  login() {
    this.navCtrl.push(CPanelClient);
  }

    gotoRegister() {
      this.navCtrl.push(Register);
    }
}
