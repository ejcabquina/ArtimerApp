import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ToastController, LoadingController, AlertController, ActionSheetController } from 'ionic-angular';

import { AuthService } from '../../providers/auth-service/auth-service';

import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';

import { Base64 } from '@ionic-native/base64';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';


/** Generated class for the EditProfilePage page. */

declare var cordova: any;

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage implements OnInit{

  loading: any;
  lastImage: string = null
  Image64: string;

  data: any;
  
  displayData: any;
  displayImage: any;
  displayFirstName: any;
  displayLastName: any;
  displayCountry:any;
  displayRegion:any;
  displayCity:any;
  displayDesc:any;
  displayEmail:any;
  displayMobile:any;

  inputData: string;
  inputImage: string;
  inputFirstName: string;
  inputLastName: string;
  inputCountry:string;
  inputRegion:string;
  inputCity:string;
  inputDesc:string;
  inputEmail:string;
  inputMobile:string;

  editProfileData = {
    "pass":{"value":{"existing":""}},
    "mail":{"value":""},
    "field_country":{"value":""},
    "field_region":{"value":""},
    "field_city":{"value":""},
    "field_mobile_number":{"value":""},
    "field_first_name":{"value":""},
    "field_last_name":{"value":""},
    "field_short_description":{"value":""}
 }; 

 /*  editProfileData = {
  'field_city':[{'value':''}],
  'field_country':[{'value':''}],
  'field_first_name':[{'value':''}],
  'field_last_name':[{'value':''}],
  'field_mobile_number':[{'value':''}],
  'field_region':[{'value':''}],
  'field_short_description':[{'value':''}]
   }; */

  
  
  
  constructor(private base64: Base64, private transfer: Transfer, private file: File, private filePath: FilePath, 
    public platform: Platform, public actionSheetCtrl: ActionSheetController,private alertCtrl: AlertController, 
    public navCtrl: NavController, public navParams: NavParams, public authService: AuthService,
    private camera: Camera, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
      this.reloadCurrentData();
    }

    ngOnInit(){
      
      this.authService.loadUserData().subscribe(data => {
      
      this.displayFirstName = data.field_first_name.map(res => { console.log(res.value); this.inputFirstName = res.value; return res.value; });
      this.displayLastName = data.field_last_name.map(res => { console.log(res.value); this.inputLastName = res.value; return res.value;});
      this.displayEmail = data.mail.map(res => { console.log(res.value); this.inputEmail = res.value; return res.value; });
      this.displayMobile = data.field_mobile_number.map(res => { console.log(res.value); this.inputMobile = res.value; return res.value; });
      this.displayCity = data.field_city.map(res => { console.log(res.value); this.inputCity = res.value; return res.value; });
      this.displayCountry = data.field_country.map(res => { console.log(res.value); this.inputCountry = res.value; return res.value; });
      this.displayRegion = data.field_region.map(res => { console.log(res.value); this.inputRegion = res.value; return res.value; });
      this.displayDesc = data.field_short_description.map(res => { console.log(res.value); this.inputDesc = res.value; return res.value; });

      this.editProfileData = {
        "pass":{"value":{"existing":""}},
        "mail":{"value":this.inputEmail},
        "field_country":{"value":this.inputCountry},
        "field_region":{"value":this.inputRegion},
        "field_city":{"value":this.inputCity},
        "field_mobile_number":{"value":this.inputMobile},
        "field_first_name":{"value":this.inputFirstName},
        "field_last_name":{"value":this.inputLastName},
        "field_short_description":{"value":this.inputDesc}
     }; 
       
        console.log('editprofiledata',);
        console.log('editprofile fname',this.displayFirstName);
        console.log('editprofile lname',this.displayLastName);
        console.log('editprofile mobile',this.displayMobile);
        console.log('editprofile city',this.displayCity);
        console.log('editprofile country',this.displayCountry);
        console.log('editprofile region',this.displayRegion);
        console.log('editprofile mail',this.displayEmail);
      });

    }

    reloadCurrentData(){
      this.authService.loadUserData().subscribe(data => {
      
      this.displayFirstName = data.field_first_name.map(res => { console.log(res.value); this.inputFirstName = res.value; return res.value; });
      this.displayLastName = data.field_last_name.map(res => { console.log(res.value); this.inputLastName = res.value; return res.value;});
      this.displayEmail = data.mail.map(res => { console.log(res.value); this.inputEmail = res.value; return res.value; });
      this.displayMobile = data.field_mobile_number.map(res => { console.log(res.value); this.inputMobile = res.value; return res.value; });
      this.displayCity = data.field_city.map(res => { console.log(res.value); this.inputCity = res.value; return res.value; });
      this.displayCountry = data.field_country.map(res => { console.log(res.value); this.inputCountry = res.value; return res.value; });
      this.displayRegion = data.field_region.map(res => { console.log(res.value); this.inputRegion = res.value; return res.value; });
      this.displayDesc = data.field_short_description.map(res => { console.log(res.value); this.inputDesc = res.value; return res.value; });

       
        console.log('editprofiledata',);
        console.log('editprofile fname',this.displayFirstName);
        console.log('editprofile lname',this.displayLastName);
        console.log('editprofile mobile',this.displayMobile);
        console.log('editprofile city',this.displayCity);
        console.log('editprofile country',this.displayCountry);
        console.log('editprofile region',this.displayRegion);
        console.log('editprofile mail',this.displayEmail);
      });

    }

    saveProfile(){
    this.reloadCurrentData();
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

  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }


public takePicture(sourceType) {
  // Create options for the Camera Dialog
  var options = {
    quality: 100,
    sourceType: sourceType,
    saveToPhotoAlbum: false,
    correctOrientation: true
  };
 
  // Get the data of an image
  this.camera.getPicture(options).then((imagePath) => {
    // Special handling for Android library
    if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
      this.filePath.resolveNativePath(imagePath)
        .then(filePath => {
          let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
          let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
          this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
        });
    } else {
      var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
      var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
      this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
    }
  }, (err) => {
    this.presentToast('Error while selecting image.');
  });
}

// Create a new name for the image
private createFileName() {
  var d = new Date(),
  n = d.getTime(),
  newFileName =  n + ".jpg";
  return newFileName;
}
 
// Copy the image to a local folder
private copyFileToLocalDir(namePath, currentName, newFileName) {
  this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
    this.lastImage = newFileName;
  }, error => {
    this.presentToast('Error while storing file.');
  });
}
 
// Always get the accurate path to your apps folder
public pathForImage(img) {
  if (img === null) {
    return '';
  } else {
    return cordova.file.dataDirectory + img;
  }
}

//turn it into base64 string
public toBase64(){

  let filePath = this.pathForImage(this.lastImage);
  this.base64.encodeFile(filePath).then((base64File: string) => {
    console.log(base64File);
    this.Image64 = base64File;

    let alert = this.alertCtrl.create({
      title: 'Update Successful',
      subTitle: 'Your base64 file is ='+this.Image64,
      buttons: ['OK']
    });
    alert.present();

  }, (err) => {
    console.log(err);
  });
}

public uploadImage() {
  // Destination URL
  var url = this.authService.apiUrl+'entity/file';
 
  // File for Upload
  var targetPath = this.pathForImage(this.lastImage);
 
  // File name only
  var filename = this.lastImage;
 
  var options = {
    fileKey: "file",
    fileName: filename,
    chunkedMode: false,
    mimeType: "multipart/form-data",
    params : {'fileName': filename}
  };
 
  const fileTransfer: TransferObject = this.transfer.create();
 
  this.loading = this.loadingCtrl.create({
    content: 'Uploading...',
  });
  this.loading.present();
 
  // Use the FileTransfer to upload the image
  fileTransfer.upload(targetPath, url, options).then(data => {
    this.loading.dismissAll()
    this.presentToast('Image succesful uploaded.');
  }, err => {
    this.loading.dismissAll()
    this.presentToast('Error while uploading file.');
  });
}


  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
  }

}


