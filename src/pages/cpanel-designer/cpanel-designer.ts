import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';



@Component({
  selector: 'page-cpanel-designer',
  templateUrl: 'cpanel-designer.html'
})
export class CPanelDesignerPage {

  constructor(public navCtrl: NavController) {

  }

  gotoHomePage():void {
    this.navCtrl.push(HomePage);
  }
}
