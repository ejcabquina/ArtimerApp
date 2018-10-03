import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Login } from '../login/login';


@Component({
  selector: 'register',
  templateUrl: 'register.html'
})
export class Register {

  constructor(public navCtrl: NavController) {

  }


  register(){
    
  }

  gotoLogin() {
    this.navCtrl.push(Login);
  }




}