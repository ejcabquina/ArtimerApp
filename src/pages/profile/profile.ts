import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage }  from '@ionic/storage';
import { Http } from '@angular/http';


import { RatingPage } from '../rating/rating';
import { AuthService } from '../../providers/auth-service/auth-service';


/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  displayImage: any;
  displayName: any;
  displayInfo: any;
  displayDesc: any;
  displayEmail: any;
  

  constructor(public navCtrl: NavController, public http: Http, public storage: Storage, public navParams: NavParams, private authService: AuthService) {
    this.getuserdata();
    
  }
  getuserdata() {
    this.authService.loadUserData().subscribe(data =>{
      console.log('from profile', data);
      this.displayImage = data.user_picture;
      this.displayName = data.field_name;
      this.displayInfo = data.field_address; 
      this.displayDesc = data.field_short_description; 
      this.displayEmail = data.mail;
      console.log('displayinfo',this.displayInfo);
      console.log('displayName',this.displayName);
      console.log('displayimage',this.displayImage);
      console.log('displaymail',this.displayEmail);
      console.log('displaydesc',this.displayDesc);
    });
  }


  gotoRatingPage(){
    this.navCtrl.push(RatingPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

 

 
}
