import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Login } from '../login/login'
import { Register } from '../register/register'
import { ProjectList } from '../project-list/project-list'

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
  })
  export class HomePage {
    constructor(public navCtrl: NavController) {
  
    }

    gotoLogin() {
      this.navCtrl.push(Login);
    }
  
    gotoRegister() {
      this.navCtrl.push(Register);
    }

    gotoProjectList() {
      this.navCtrl.push(ProjectList);
    }

  }