import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AuthService } from '../../providers/auth-service/auth-service';
import { HttpClient } from '@angular/common/http';

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

    "field_mobile": 
      {
        "value": ""
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

  imageURI:any;
  imageFileName:any;

  constructor( public http: HttpClient, public navCtrl: NavController, public navParams: NavParams, public authService: AuthService,
    private transfer: FileTransfer,private camera: Camera, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
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
        console.log('mobile editprofile',this.displayMobile);
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

  getImage() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
  
    this.camera.getPicture(options).then((imageData) => {
      this.imageURI = imageData;
    }, (err) => {
      console.log(err);
      this.presentToast(err);
    });
  }

  uploadFile() {
    let loader = this.loadingCtrl.create({
      content: "Uploading..."
    });
    loader.present();
    const fileTransfer: FileTransferObject = this.transfer.create();
  
    let options: FileUploadOptions = {
      fileKey: 'ionicfile',
      fileName: 'ionicfile',
      chunkedMode: false,
      mimeType: "image/jpeg",
      headers: {}
    }
  
    fileTransfer.upload(this.imageURI, 'http://192.168.0.7:8080/api/uploadImage', options)
      .then((data) => {
      console.log(data+" Uploaded Successfully");
      this.imageFileName = "http://192.168.0.7:8080/static/images/ionicfile.jpg"
      loader.dismiss();
      this.presentToast("Image uploaded successfully");
    }, (err) => {
      console.log(err);
      loader.dismiss();
      this.presentToast(err);
    });
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
  }

}


