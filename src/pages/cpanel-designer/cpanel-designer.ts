import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';



@Component({
  selector: 'cpanel-designer',
  templateUrl: 'cpanel-designer.html'
})
export class CPanelDesigner {

  constructor(public navCtrl: NavController) {

  }

  gotoHomePage():void {
    this.navCtrl.push(HomePage);
  }
}
