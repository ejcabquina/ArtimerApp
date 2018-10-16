import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AuthService } from '../../providers/auth-service/auth-service';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

/** Generated class for the EditProfilePage page. */

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage implements OnInit{

 editProfileData =  {
    
    "field_first_name":
      {
       "value":""
      },
    "field_last_name":
      {
       "value":""
      },
    "mail": 
      {
        "value": ""
      },
   
    "field_city": 
      {
        "value": ""
      },
    "field_country": 
      {
        "value": ""
      },
    "field_region": 
      {
        "value": ""
      },
    "field_mobile_number": 
      {
        "value": ""
      },
    "field_short_description": 
      {
        "value": ""
      },
      "pass":
      {
        "value":{
        "existing":""
        }
      }
  };

  

  

  

  loading: any;
  data: any;



  displayImage: string;
  displayFirstName: string;
  displayLastName: string;
  displayCountry: string;
  displayRegion: string;
  displayCity: string;
  displayDesc: string;
  displayEmail: string;
  displayMobile: string;
  

  imageURI:any;
  imageFileName:any;

  constructor( private alertCtrl: AlertController, public http: HttpClient, public navCtrl: NavController, public navParams: NavParams, public authService: AuthService,
    private transfer: FileTransfer,private camera: Camera, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
      
      console.log('from edit init',this.editProfileData);
    }

    ngOnInit(){
      this.readUserfromAuth();
    }

    readUserfromAuth(){
      this.authService.loadUserData().subscribe(data => {
        console.log('raw data editprofile',data);
       
        this.displayImage = this.authService.displayImg;
        this.displayFirstName = this.authService.displayFirstName;
        this.displayLastName = this.authService.displayLastName;
        this.displayCountry = this.authService.displayCountry;
        this.displayRegion = this.authService.displayRegion;
        this.displayCity = this.authService.displayCity;
        this.displayMobile = this.authService.displayMobile;
        this.displayDesc = this.authService.displayDesc;
        this.displayEmail = this.authService.displayEmail;
       
        console.log('FirstNameLastname editprofile',this.displayFirstName, this.displayLastName);
        console.log('Country,Region,City editprofile',this.displayCountry, this.displayRegion, this.displayCity);
        console.log('mobile editprofile',this.displayMobile);
        console.log('email editprofile',this.displayEmail);
        console.log('desc editprofile',this.displayDesc);
        console.log('img editprofile',this.displayImage);
      });
    }
  
    

  saveProfile(){
    console.log(this.editProfileData);
    this.showLoader();
    this.authService.saveProfileChanges(this.editProfileData).then( res=>{
      let alert = this.alertCtrl.create({
        title: 'Update Successful',
        subTitle: 'You have successfully updated your profile.',
        buttons: ['OK']
      });
      alert.present();

      
      this.authService.assignDisplay(); //reload
      this.navCtrl.popToRoot();
      this.loading.dismiss();
     
      //this.navCtrl.popToRoot();
    }, (err) => {
      this.loading.dismiss();
      this.presentToast(err);
    });
      console.log('save profile')
   
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


  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
  }

}


