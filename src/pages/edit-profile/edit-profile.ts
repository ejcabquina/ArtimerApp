import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../providers/auth-service/auth-service';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

/**
 * Generated class for the EditProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

  editProfileData =  {
    
    "mail": 
      {
        "value": ""
      },
    "field_address": 
      {
        "administrative_area": "",
        "locality": ""
      },

    "field_name":
      {
        "given":"",
        "family":""
      },
    
    "field_short_description": 
      {
        "value": ""
      },
    "user_picture":
      {
        "url": ""
      }
  };

  displayImage: any;
  displayName: any;
  displayInfo: any;
  displayDesc: any;
  displayEmail: any;
  displayMobile: any;

  constructor( public http: HttpClient, public navCtrl: NavController, public navParams: NavParams,  public actionSheetCtrl: ActionSheetController, public loadingCtrl: LoadingController,
    public formBuilder: FormBuilder, public camera: Camera, public authService: AuthService) {
      this.readUserfromAuth();
    }
  
    readUserfromAuth(){
      this.authService.loadUserData().subscribe(data => {
        console.log('data',data);
        this.displayImage = data.user_picture;
        this.displayName = data.field_name;
        this.displayInfo = data.field_address; 
        this.displayMobile = data.field_mobile;
        this.displayDesc = data.field_short_description; 
        this.displayEmail = data.mail;
        console.log('info editprofile',this.displayInfo);
        console.log('name editprofile',this.displayName);
        console.log('img editprofile',this.displayImage);
        console.log('email editprofile',this.displayEmail);
        console.log('desc editprofile',this.displayDesc);
      });
    }

  saveProfile(){
    this.authService.saveProfileChanges(this.editProfileData).then( res=>{
      console.log('save profile')
      this.navCtrl.popToRoot();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
  }

}


