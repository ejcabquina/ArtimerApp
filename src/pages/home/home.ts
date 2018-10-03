import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login'
import { RegisterPage } from '../register/register'
import { ProjectListPage } from '../project-list/project-list'

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
  })
  export class HomePage {
    constructor(public navCtrl: NavController) {
  
    }

    gotoLogin() {
      this.navCtrl.push(LoginPage);
    }
  
    gotoRegister() {
      this.navCtrl.push(RegisterPage);
    }

    gotoProjectList() {
      this.navCtrl.push(ProjectListPage);
    }

  }