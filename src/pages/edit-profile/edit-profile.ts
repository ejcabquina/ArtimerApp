import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ToastController, LoadingController, AlertController, ActionSheetController, normalizeURL } from 'ionic-angular';


import { AuthService } from '../../providers/auth-service/auth-service';

import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { Base64 } from '@ionic-native/base64';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

import { Http, Headers } from '@angular/http';


/** Generated class for the EditProfilePage page. */

declare var cordova: any;

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage implements OnInit{

  loading: any;
  lastImage: string = null;
  Image64: string;
  imageFile: any;
  isImageInputValid: boolean;
  targetFID:string = null;
  ImageFileName: any;
  RawBinary: any;

  data: any;
  
  displayData: any;
  currentImage: string;
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

  
  
  
  constructor(private http: Http ,private base64: Base64, private transfer: Transfer, private file: File, private filePath: FilePath, 
    public platform: Platform, public actionSheetCtrl: ActionSheetController,private alertCtrl: AlertController, 
    public navCtrl: NavController, public navParams: NavParams, public authService: AuthService,
    private camera: Camera, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
      this.reloadCurrentData();
    }

    ngOnInit(){

      this.isImageInputValid = false;
      
      this.authService.loadUserData().subscribe(data => {
      
      this.currentImage = data.user_picture.map(res => { console.log(res.url); return res.url; });
      this.displayFirstName = data.field_first_name.map(res => { console.log(res.value); this.inputFirstName = res.value; return res.value; });
      this.displayLastName = data.field_last_name.map(res => { console.log(res.value); this.inputLastName = res.value; return res.value;});
      this.displayEmail = data.mail.map(res => { console.log(res.value); this.inputEmail = res.value; return res.value; });
      this.displayMobile = data.field_mobile_number.map(res => { console.log(res.value); this.inputMobile = res.value; return res.value; });
      this.displayCity = data.field_city.map(res => { console.log(res.value); this.inputCity = res.value; return res.value; });
      this.displayCountry = data.field_country.map(res => { console.log(res.value); this.inputCountry = res.value; return res.value; });
      this.displayRegion = data.field_region.map(res => { console.log(res.value); this.inputRegion = res.value; return res.value; });
      this.displayDesc = data.field_short_description.map(res => { console.log(res.value); this.inputDesc = res.value; return res.value; });

      this.editProfileData = { //sets input to currentvalues. this gets overwritten by [(ngModel)] inputs
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
        console.log('editprofiledata',this.currentImage);
        console.log('sample input',this.inputFirstName);
        console.log('editprofile fname',this.displayFirstName);
        console.log('editprofile lname',this.displayLastName);
        console.log('editprofile mobile',this.displayMobile);
        console.log('editprofile city',this.displayCity);
        console.log('editprofile country',this.displayCountry);
        console.log('editprofile region',this.displayRegion);
        console.log('editprofile mail',this.displayEmail);
      });

    }

    reloadCurrentData(){ //Jep Notes: pangreload ng current values. narereload din yung input pero ok lang kasi overwritten din siya ng [(ngModel)]
      this.authService.loadUserData().subscribe(data => {
      
      this.currentImage = data.user_picture.map(res => { console.log(res.url); return res.url; });
      this.displayFirstName = data.field_first_name.map(res => { console.log(res.value); this.inputFirstName = res.value; return res.value; });
      this.displayLastName = data.field_last_name.map(res => { console.log(res.value); this.inputLastName = res.value; return res.value;});
      this.displayEmail = data.mail.map(res => { console.log(res.value); this.inputEmail = res.value; return res.value; });
      this.displayMobile = data.field_mobile_number.map(res => { console.log(res.value); this.inputMobile = res.value; return res.value; });
      this.displayCity = data.field_city.map(res => { console.log(res.value); this.inputCity = res.value; return res.value; });
      this.displayCountry = data.field_country.map(res => { console.log(res.value); this.inputCountry = res.value; return res.value; });
      this.displayRegion = data.field_region.map(res => { console.log(res.value); this.inputRegion = res.value; return res.value; });
      this.displayDesc = data.field_short_description.map(res => { console.log(res.value); this.inputDesc = res.value; return res.value; });

      
        console.log('editprofiledata',);
        console.log('editprofiledata',this.currentImage);
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
      console.log('SaveProfileChanges',res);
      if(this.targetFID != null){
        this.SavePhoto();
      }

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
        content: 'Updating...'
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
  /* var options = {
    quality: 100,
    sourceType: sourceType,
    saveToPhotoAlbum: false,
    correctOrientation: true
  }; */

  const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    sourceType: sourceType,
    saveToPhotoAlbum: false,
    correctOrientation: true
  };

  // Get the data of an image
  this.camera.getPicture(options).then((imagePath) => {
    console.log('freshfromcamera',imagePath);
    // Special handling for Android library
    if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
      this.filePath.resolveNativePath(imagePath)
        .then(filePath => {
          console.log('cameragetpictureoptions pre process',filePath,imagePath);
          let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
          let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
          console.log('cameragetpictureoptions pre process post process',correctPath,currentName,imagePath);
          this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          
        });
    } else {
      var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
      var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
      console.log('from library',correctPath,currentName,imagePath);
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
  console.log('createfilename',newFileName);
  return newFileName;
}
 
// Copy the image to a local folder
private copyFileToLocalDir(namePath, currentName, newFileName) {
  this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
    console.log('namepath+currentname+cordova.file.datadirectory',namePath,currentName, cordova.file.dataDirectory);
    this.lastImage = newFileName;
    console.log('copyfile lastimage',this.lastImage)
    this.processImage();
  }, error => {
    this.presentToast('Error while storing file.');
  });
}


// Always get the accurate path to your apps folder
public pathForImage(img) {
  if (img === null) {
    return '';
  } else {
    let path = cordova.file.dataDirectory;
    let normalizePath = normalizeURL(path);
    return normalizePath + img;
  }
}


private processImage() {
  // File for Upload
  var targetPath = this.pathForImage(this.lastImage);
  console.log('targetpath',targetPath);

  //convert to base64
  this.toBase64(targetPath);
}

public toBase64(data){

  this.base64.encodeFile(data).then((base64File: string) => {

  
    this.Image64 = base64File.split(',')[1];
    console.log('processedimage64',this.Image64);

    //convert to binary
    this.convertDataURIToBinary(this.Image64);
  }, (err) => {
    console.log(err);
  });
}


  convertDataURIToBinary(data) {
    var binary_string = atob(data);
    console.log('binary_string',binary_string);
    var len = binary_string.length;
    var bytes = new Uint8Array( len );
    for (var i = 0; i < len; i++)        {
        bytes[i] = binary_string.charCodeAt(i);
    }
    this.showLoader();
    this.RawBinary = new Blob([new Uint8Array(bytes.buffer)], {type: 'image/jpg'});

    console.log('convertDataURIToBinary uint8array',bytes.buffer);
    console.log('convertDataURIToBinary rawbinary',this.RawBinary);
    this.settemporaryImg();
    this.loading.dismiss();
  }

  private settemporaryImg(){
    var targetPath:string = this.pathForImage(this.lastImage);
    console.log('targetpath convert to string', targetPath);
    this.currentImage = targetPath;
    console.log('changecurrentimg normalizeurl',this.currentImage);
  }

  public uploadImage(){
  
    console.log('auth postphoto fires', JSON.stringify(this.lastImage) );
    return new Promise((resolve, reject) => {
    let headers = new Headers();
        headers.append('Authorization', 'Basic '+ this.authService.BasicAuthString);
        headers.append('Content-Type', 'application/octet-stream');
        headers.append('Content-Disposition','filename='+JSON.stringify(this.lastImage));
   
    this.http.post(this.authService.apiUrl+'/file/upload/user/user/user_picture', this.RawBinary , {headers: headers}).subscribe(res => {
      console.log('uploadimage result',res);
      if(res.status = 201){
        let alert = this.alertCtrl.create({
          title: 'Upload Successful',
          subTitle: 'You have successfully uploaded a picture. Click save to make changes permanent',
          buttons: ['OK']
        });
        res.json().uri.map(data => {this.currentImage = this.authService.apiUrl+data.url; return data.url;} );
        console.log('currentimage',this.currentImage);
        res.json().fid.map(data => { this.targetFID = data.value; return data.value });
        console.log(this.targetFID);
        alert.present();
        resolve(res);
      }
      }, (err) => {
        reject(err);
      });
    });
    }

    SavePhoto(){
      var fid = this.targetFID;
      console.log('SavePhoto() fires',fid );
      return new Promise((resolve, reject) => {
      let headers = new Headers();
          headers.append('Authorization', 'Basic '+ this.authService.BasicAuthString);
          headers.append('Content-Type', 'application/json');
  
      var user_field = {
        "user_picture":
          {
            "target_id": fid
          }
      };
        
      this.http.patch(this.authService.apiUrl+'/user/'+this.authService.UserID+'?_format=json', user_field , {headers: headers}).subscribe(res => {
        console.log('SavePhoto Patch result',res);
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  
    }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
  }

}


