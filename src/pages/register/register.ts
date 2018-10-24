import { Component } from '@angular/core';
import { NavController, NavParams,  AlertController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  loading: any;
  regData = {
    "name":{"value":""},
    "pass":{"value":""},
    "mail":{"value":""},
    "field_country":{"value":""},
    "field_region":{"value":""},
    "field_city":{"value":""},
    "field_mobile_number":{"value":""},
    "field_first_name":{"value":""},
    "field_last_name":{"value":""},
    "field_short_description":{"value":""}
  };

  checker = {
    "mail2":{"value":""},
    "pass2":{"value":""}
  };

  IsPassMatch = false;
  IsMailMatch = false;
  IsValidForm = false;

  constructor( private alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public authService: AuthService) {
  }

  formRegister(){
    this.checkPassMatch();
  }

  checkPassMatch(){
    if(this.regData.pass.value !== this.checker.pass2.value){
      let alert = this.alertCtrl.create({
        title: 'Password Mismatch',
        subTitle: 'Passwords do not match. Please re-type your password.',
        buttons: ['OK']
      });
      alert.present();
    }
    else if(this.regData.pass.value == '' && this.checker.pass2.value == ''){
      let alert = this.alertCtrl.create({
        title: 'Password Empty',
        subTitle: 'Password field is empty. Please type your password.',
        buttons: ['OK']
      });
      alert.present();
    }
    else{
      console.log('passmatch');
      this.IsPassMatch = true;
      this.checkMailMatch();
    }
  }

  checkMailMatch(){
   
    if(this.regData.mail.value !== this.checker.mail2.value){
      let alert = this.alertCtrl.create({
        title: 'Email Mismatch',
        subTitle: 'Email do not match. Please re-type your email.',
        buttons: ['OK']
      });
      alert.present();
    }
    else if(this.regData.mail.value == '' && this.checker.mail2.value == ''){
      let alert = this.alertCtrl.create({
        title: 'Email Empty',
        subTitle: 'Email field is empty. Please type your email.',
        buttons: ['OK']
      });
      alert.present();
    }
    else{
      this.IsMailMatch = true;
      console.log('checkmail');
      this.isValidated();
    }
  }

  isValidated(){
    if(this.IsMailMatch !== true && this.IsPassMatch !== true){
      let alert = this.alertCtrl.create({
        title: 'Credentials Mismatch',
        subTitle: 'Passwords and/or Email do not match. Please re-type your email and/or password.',
        buttons: ['OK']
      });
      alert.present();
    }
    else{
      this.IsValidForm = true;
      this.postRegister();
      console.log('isvalidated');
    }
  }

  postRegister() {
    console.log(this.regData);
    this.authService.register(this.regData).then(result => {
      console.log('authService.register() result',result);
      let alert = this.alertCtrl.create({
        title: 'Registration Successful',
        subTitle: 'You have successfully registered an account.',
        buttons: ['OK']
      });
      alert.present();
    }, (err) => {
      console.log('authService.register() error',err);
      var error = JSON.stringify(err['_body']);
      var errorSlice = error.slice(58,-4);
      var errorDetails = errorSlice.replace(/[\n]+/g,"");
      let alert = this.alertCtrl.create({
        title: 'Error '+err['status']+' '+err['statusText'],
        subTitle: errorDetails,
        buttons: ['OK']
      });
      alert.present();
    });
  }

  gotoLogin(){
    this.navCtrl.push(LoginPage);
  }
}