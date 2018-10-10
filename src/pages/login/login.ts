import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { RegisterPage } from '../register/register';
import { CPanelPage } from '../cpanel/cpanel'


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage{


  loading: any;
  loginData = {'name':'','pass':''};
  data:any;

  constructor(public navCtrl: NavController, private authService: AuthService, public loadingCtrl: LoadingController, private toastCtrl: ToastController) {
  
  }

  doLogin() {
    this.showLoader();
    this.authService.authenticate(this.loginData).then((result) => {
      this.loading.dismiss();
      this.data = result;
      this.navCtrl.setRoot(CPanelPage);
      this.navCtrl.push(CPanelPage);
    }, (err) => {
      this.loading.dismiss();
      this.presentToast(err);
    });
  }

  gotoRegister(){
    this.navCtrl.push(RegisterPage);
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
        content: 'Authenticating...'
    });

    this.loading.present();
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
      dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }


}