import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';

import 'rxjs/add/operator/map'

@Injectable()

export class AuthService {

  apiUrl: string =  'https://dev-artimer.pantheonsite.io';
  public isLoggedIn = false;
  public CSRFToken: string;
  public LToken: string;
  public UserID: string;

  public displayData: any;
  public displayImg: any;
  public displayFirstName: any;
  public displayLastName: any;
  public displayCity: any;
  public displayRegion: any;
  public displayCountry: any;
  public displayDesc: any;
  public displayEmail: any;
  public displayMobile: any;
  
  data: any;


  constructor(public http: Http, public storage: Storage) {
    this.isLoggedIn = false;
    this.CSRFToken = null;
    this.LToken = null;
    this.UserID = null;
    this.getlogs();
  }

  authenticate(credentials){
    return new Promise((resolve, reject) => {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log(localStorage.getItem('basic_token'));
    this.http.post(this.apiUrl+'/user/login?_format=json',JSON.stringify(credentials),{headers: headers}).subscribe(res => {
        let oAuthUrl = this.apiUrl+'/oauth/token';
        let apiTokenUrl = this.apiUrl+'/rest/session/token';
        let credData = credentials.name+':'+credentials.pass;
  
          localStorage.setItem('basic_token',btoa(credData));
          console.log(localStorage.getItem('basic_token'));
        
        this.storeLOtoken(res.json().logout_token);
        this.storeUserCredentials(res.json().csrf_token);
        this.storeUserID(res.json().current_user.uid);
        headers.append('Authorization', 'Basic '+ localStorage.getItem('basic_token'));
          this.http.get(apiTokenUrl)
            .subscribe(data =>{ 
              localStorage.setItem('loggedin_token',data['_body']);
              this.getpostprocessLogs();
              this.assignDisplay();
            }, error =>{
              console.log(error);// Error getting the data
            });
       
          resolve(true); //resolve end
        }, (err) => {
          reject(err); //reject promise
        });
      });
  }

  loadUserData(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('X-CSRF-Token', localStorage.getItem('loggedin_token'));
    headers.append('Authorization', 'Basic '+ localStorage.getItem('basic_token'));
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('Accept','application/json');

    var readData = this.http.get(this.apiUrl+'/user/'+ this.UserID+'?_format=json', {headers: headers,withCredentials:true}).map(data =>data.json());
    return readData;
  }

  assignDisplay(){ //preloading files on auth
    this.loadUserData().subscribe(data => {
      console.log('from assign data raw',data)
      this.displayData = data;
      this.displayImg = data.user_picture;
      this.displayFirstName = data.field_first_name;
      this.displayLastName = data.field_last_name;
      this.displayCity = data.field_city; 
      this.displayRegion = data.field_region; 
      this.displayCountry = data.field_country; 
      this.displayMobile = data.field_mobile_number;
      this.displayDesc = data.field_short_description; 
      this.displayEmail = data.mail; 
      console.log('displayData authservice.ts',this.displayData);
      console.log('displayCity authservice.ts',this.displayCity);
      console.log('displayRegion authservice.ts',this.displayRegion);
      console.log('displayCountry authservice.ts',this.displayCountry);
      console.log('displayFirstName authservice.ts',this.displayFirstName);
      console.log('displayLastName authservice.ts',this.displayLastName);
      console.log('displayimage authservice.ts',this.displayImg);
      console.log('displaymobile authservice.ts',this.displayMobile);
      console.log('displaymail authservice.ts',this.displayEmail);
      console.log('displaydesc authservice.ts',this.displayDesc);
    });
  }

  EditFirstName(data) { //checks current value and does patch query if '' or undefined or null
    let InputFirstName = data.field_name.given;
    let currentFirstNameValue = this.displayFirstName.given;
    console.log(currentFirstNameValue);
    if(currentFirstNameValue !== '' ||  currentFirstNameValue !== undefined || currentFirstNameValue !== null){
      return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('X-CSRF-Token', localStorage.getItem('loggedin_token'));
        headers.append('Authorization', 'Basic '+ localStorage.getItem('basic_token'));
  
        this.http.patch(this.apiUrl+'/user/'+this.UserID+'?_format=json',JSON.stringify(InputFirstName), {headers: headers})
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
    }
    else{
      return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('X-CSRF-Token', localStorage.getItem('loggedin_token'));
        headers.append('Authorization', 'Basic '+ localStorage.getItem('basic_token'));
  
        this.http.patch(this.apiUrl+'/user/'+this.UserID+'?_format=json',JSON.stringify(currentFirstNameValue), {headers: headers})
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
    }
  } //EditFirstName

  EditLastName(data) { //checks current value and does patch query if '' or undefined or null
    let InputLastName = data.field_name.family;
    let currentLastNameValue = this.displayLastName.family;
    if(currentLastNameValue !== '' ||  currentLastNameValue !== undefined || currentLastNameValue !== null){
      return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('X-CSRF-Token', localStorage.getItem('loggedin_token'));
        headers.append('Authorization', 'Basic '+ localStorage.getItem('basic_token'));
  
        this.http.patch(this.apiUrl+'/user/'+this.UserID+'?_format=json',JSON.stringify(InputLastName), {headers: headers})
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
    }
    else{
      return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('X-CSRF-Token', localStorage.getItem('loggedin_token'));
        headers.append('Authorization', 'Basic '+ localStorage.getItem('basic_token'));
  
        this.http.patch(this.apiUrl+'/user/'+this.UserID+'?_format=json',JSON.stringify(currentLastNameValue), {headers: headers})
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
    }
  }//EditLastName

  EditMail(data) { //checks current value and does patch query if '' or undefined or null
    let InputEmail = data.mail.value;
    let currentEmailValue = this.displayEmail;
    if(currentEmailValue !== '' ||  currentEmailValue !== undefined || currentEmailValue !== null){
      return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('X-CSRF-Token', localStorage.getItem('loggedin_token'));
        headers.append('Authorization', 'Basic '+ localStorage.getItem('basic_token'));
  
        this.http.patch(this.apiUrl+'/user/'+this.UserID+'?_format=json',JSON.stringify(InputEmail), {headers: headers})
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
    }
    else{
      return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('X-CSRF-Token', localStorage.getItem('loggedin_token'));
        headers.append('Authorization', 'Basic '+ localStorage.getItem('basic_token'));
  
        this.http.patch(this.apiUrl+'/user/'+this.UserID+'?_format=json',JSON.stringify(currentEmailValue), {headers: headers})
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
    }
  }//EditMail

  EditCountry(data) { //checks current value and does patch query if '' or undefined or null
    let InputCountry = data.field_country.value;
    let currentCountryValue = this.displayCountry;
    if(currentCountryValue !== '' ||  currentCountryValue !== undefined || currentCountryValue !== null){
      return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('X-CSRF-Token', localStorage.getItem('loggedin_token'));
        headers.append('Authorization', 'Basic '+ localStorage.getItem('basic_token'));
  
        this.http.patch(this.apiUrl+'/user/'+this.UserID+'?_format=json',JSON.stringify(InputCountry), {headers: headers})
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
    }
    else{
      return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('X-CSRF-Token', localStorage.getItem('loggedin_token'));
        headers.append('Authorization', 'Basic '+ localStorage.getItem('basic_token'));
  
        this.http.patch(this.apiUrl+'/user/'+this.UserID+'?_format=json',JSON.stringify(currentCountryValue), {headers: headers})
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
    }
  }//EditCountry

  EditRegion(data) { //checks current value and does patch query if '' or undefined or null
    let InputRegion = data.field_region.value;
    let currentRegionValue = this.displayRegion;
    if(currentRegionValue !== '' ||  currentRegionValue !== undefined || currentRegionValue !== null){
      return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('X-CSRF-Token', localStorage.getItem('loggedin_token'));
        headers.append('Authorization', 'Basic '+ localStorage.getItem('basic_token'));
  
        this.http.patch(this.apiUrl+'/user/'+this.UserID+'?_format=json',JSON.stringify(InputRegion), {headers: headers})
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
    }
    else{
      return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('X-CSRF-Token', localStorage.getItem('loggedin_token'));
        headers.append('Authorization', 'Basic '+ localStorage.getItem('basic_token'));
  
        this.http.patch(this.apiUrl+'/user/'+this.UserID+'?_format=json',JSON.stringify(currentRegionValue), {headers: headers})
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
    }
  }//EditRegion

  EditCity(data) { //checks current value and does patch query if '' or undefined or null
    let InputCity = data.field_city.value;
    let currentCityValue = this.displayCity;
    if(currentCityValue !== '' ||  currentCityValue !== undefined || currentCityValue !== null){
      return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('X-CSRF-Token', localStorage.getItem('loggedin_token'));
        headers.append('Authorization', 'Basic '+ localStorage.getItem('basic_token'));
  
        this.http.patch(this.apiUrl+'/user/'+this.UserID+'?_format=json',JSON.stringify(InputCity), {headers: headers})
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
    }
    else{
      return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('X-CSRF-Token', localStorage.getItem('loggedin_token'));
        headers.append('Authorization', 'Basic '+ localStorage.getItem('basic_token'));
  
        this.http.patch(this.apiUrl+'/user/'+this.UserID+'?_format=json',JSON.stringify(currentCityValue), {headers: headers})
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
    }
  }//EditCity

  EditMobile(data) { //checks current value and does patch query if '' or undefined or null
    let InputMobile = data.field_mobile_number.value;
    let currentMobileValue = this.displayMobile;
    if(currentMobileValue !== '' ||  currentMobileValue !== undefined || currentMobileValue !== null){
      return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('X-CSRF-Token', localStorage.getItem('loggedin_token'));
        headers.append('Authorization', 'Basic '+ localStorage.getItem('basic_token'));
  
        this.http.patch(this.apiUrl+'/user/'+this.UserID+'?_format=json',JSON.stringify(InputMobile), {headers: headers})
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
    }
    else{
      return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('X-CSRF-Token', localStorage.getItem('loggedin_token'));
        headers.append('Authorization', 'Basic '+ localStorage.getItem('basic_token'));
  
        this.http.patch(this.apiUrl+'/user/'+this.UserID+'?_format=json',JSON.stringify(currentMobileValue), {headers: headers})
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
    }
  }//EditMobile


  EditDesc(data) { //checks current value and does patch query if '' or undefined or null
    let InputDesc = data.field_short_description.value;
    let currentDescValue = this.displayDesc;
    if(currentDescValue !== '' ||  currentDescValue !== undefined || currentDescValue !== null){
      return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('X-CSRF-Token', localStorage.getItem('loggedin_token'));
        headers.append('Authorization', 'Basic '+ localStorage.getItem('basic_token'));
  
        this.http.patch(this.apiUrl+'/user/'+this.UserID+'?_format=json',JSON.stringify(InputDesc), {headers: headers})
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
    }
    else{
      return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('X-CSRF-Token', localStorage.getItem('loggedin_token'));
        headers.append('Authorization', 'Basic '+ localStorage.getItem('basic_token'));
  
        this.http.patch(this.apiUrl+'/user/'+this.UserID+'?_format=json',JSON.stringify(currentDescValue), {headers: headers})
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
    }
  }//EditDesc

 EditImg(data) { //checks current value and does patch query if '' or undefined or null
    let InputImg = data.user_picture.url;
    let currentImgValue = this.displayImg;
    if(currentImgValue !== '' ||  currentImgValue !== undefined || currentImgValue !== null){
      return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('X-CSRF-Token', localStorage.getItem('loggedin_token'));
        headers.append('Authorization', 'Basic '+ localStorage.getItem('basic_token'));
  
        this.http.patch(this.apiUrl+'/user/'+this.UserID+'?_format=json',JSON.stringify(InputImg), {headers: headers})
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
    }
    else{
      return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('X-CSRF-Token', localStorage.getItem('loggedin_token'));
        headers.append('Authorization', 'Basic '+ localStorage.getItem('basic_token'));
  
        this.http.patch(this.apiUrl+'/user/'+this.UserID+'?_format=json',JSON.stringify(currentImgValue), {headers: headers})
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
    }
  }//EditImg


  getlogs() {
    console.log('logout_token stored in LToken',this.LToken);
    console.log('csrf_token stored in CSRFToken',this.CSRFToken);
    console.log('uid stored in UserID',this.UserID);
}

getpostprocessLogs(){
  console.log('logout_token stored in LToken',this.LToken);
  console.log('csrf_token stored in CSRFToken',this.CSRFToken);
  console.log('uid stored in UserID',this.UserID);
  console.log('token from session',localStorage.getItem('loggedin_token'));
}

logoutCredentialsCheck(){
  console.log('logout_token stored in LToken',this.LToken);
  console.log('csrf_token stored in CSRFToken',this.CSRFToken);
  console.log('uid stored in UserID',this.UserID);
}
  
storeUserID(uid){
  this.storage.set('uid', uid);
  this.useUserID(uid);
}

  storeLOtoken(token_logout){
    this.storage.set('logout_token', token_logout);
    this.useLOToken(token_logout);
  }

  storeUserCredentials(token) {
    this.storage.set('token',token);
    this.useCredentials(token);
  }

  useCredentials(token) {
    this.isLoggedIn = true;
    this.CSRFToken = token;
  }

  useLOToken(token_logout) {
    this.LToken = token_logout;
  }

  useUserID(uid) {
    this.UserID = uid;
  }


  loadLOToken() {
    let token_logout = this.storage.get('logout_token');
    this.useLOToken(token_logout);
  }

  loadUserID() {
    let uid = this.storage.get('uid');
    this.useUserID(uid);
  }

  loadUserCredentials() {
    let token = this.storage.get('token');
    this.useCredentials(token);
  }

  // Destroy Authentication of User
  destroyUserCredentials() {
      this.isLoggedIn = false;
      this.CSRFToken = null;
      this.storage.clear();
      localStorage.clear();
  }

  createAuthorization(headers: Headers) {
    headers.append('Authorization', localStorage.getItem('loggedin_token'));
  }

  saveProfileChanges(data){
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Authorization', 'Basic '+ localStorage.getItem('basic_token'));
      headers.append('Content-Type', 'application/json');

      this.http.patch(this.apiUrl+'/user/'+this.UserID+'?_format=json', data, {headers: headers})
        .subscribe(res => {
          
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  register(data) {
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        console.log('register executes');
        this.http.post(this.apiUrl+'/user/register?_format=json', data, {headers: headers})
          .subscribe(res => {
            resolve(res.json());
          }, (err) => {
            reject(err);
          });
    });
  }

  logout(){
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        
        headers.append('X-CSRF-Token', localStorage.getItem('loggedin_token'));
        headers.append('Authorization', 'Basic '+ localStorage.getItem('basic_token'));

        this.http.post(this.apiUrl+'/user/logout?csrf_token=123',{}, {headers: headers})
          .subscribe(res => {
            this.destroyUserCredentials();
          
          }, (err) => {
            reject(err);
          });
    });
  }
  
}
