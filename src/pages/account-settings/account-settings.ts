import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../providers/auth-service/auth-service';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';


import { HomePage } from '../home/home';
import { Storage }  from '@ionic/storage';




/**
 * Generated class for the AccountSettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-account-settings',
  templateUrl: 'account-settings.html',
})
export class AccountSettingsPage implements OnInit {

  constructor(public http: Http, public navCtrl: NavController, private authService: AuthService, public storage: Storage) {
    
 }

 ngOnInit(){

 }

 
 logout() {
  this.navCtrl.setRoot(HomePage);
  this.navCtrl.push(HomePage);
  this.authService.logoutCredentialsCheck();
  this.authService.logout().then((result) => {
    this.navCtrl.setRoot(HomePage);
    this.navCtrl.push(HomePage);
    this.authService.logoutCredentialsCheck();
  }, (err) => {
    /** put error here */
  });
}


  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountSettingsPage');
  }

}
