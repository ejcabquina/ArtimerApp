import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { EditProfilePage } from '../edit-profile/edit-profile';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  loading: any;
  regData = { 
    "field_name": 
      [{
        "given_name": "",
        "middle_name": "",
        "family_name": ""
      }],
    "field_mobile": 
      [{
        "value": ""
      }],
    "field_short_description":
      [{
        "value": "",
        "format": "",
        "processed": ""
      }],
    "name": { "value": "" }, 
    "pass": { "value": "" }, 
    "mail": { "value": "" }
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthService) {
  
  }

  doRegister() {
    
    this.authService.register(this.regData).then((result) => {
      this.navCtrl.popToRoot();
    }, (err) => {
     
    });
  }

}