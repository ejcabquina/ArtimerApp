import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/filter';




@Injectable()

export class AuthService {

  apiUrl: string ='http://dev-artimer.pantheonsite.io';
  public isLoggedIn = false;
  public CSRFToken: string = null;
  public RestToken: string = null;
  public LToken: string = null;
  public UserID: string = null;
  public BasicAuthString: string = null;

  public displayData: any;
  public displayImage: any;
  public displayFirstName: any ;
  public displayLastName: any;
  public displayCity: any;
  public displayRegion: any;
  public displayCountry: any;
  public displayDesc: any;
  public displayEmail: any;
  public displayMobile: any;
  public displayCreated: any;

  
  data: any;
  SelectedNID:any;


  constructor(public http: Http, public storage: Storage) {
    this.isLoggedIn = false;
    this.CSRFToken = null;
    this.RestToken = null;
    this.LToken = null;
    this.UserID = null;
    this.getlogs();
  }

  register(data) {
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Accept','application/json');
        headers.append('Content-Type', 'application/json');
        console.log('register executes');
        this.http.post(this.apiUrl+'/user/register?_format=json', data, {headers: headers})
        .subscribe(res => {

             console.log('register .map',res);
            resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  authenticate(credentials){
    console.log('login data',credentials);
    return new Promise((resolve, reject) => {
    let headers = new Headers();
    headers.append('Accept','application/json');
    headers.append('Content-Type', 'application/json');

    this.http.post(this.apiUrl+'/user/login?_format=json',JSON.stringify(credentials),{headers: headers}).subscribe(res => {
        let apiTokenUrl = this.apiUrl+'/rest/session/token';
        let credData = credentials.name+':'+credentials.pass;
  
          localStorage.setItem('basic_token',btoa(credData));
          this.BasicAuthString = localStorage.getItem('basic_token');
          console.log(localStorage.getItem('basic_token'));
        
        this.storeLOtoken(res.json().logout_token);
        this.storeUserCredentials(res.json().csrf_token);
        this.storeUserID(res.json().current_user.uid);
        headers.append('Authorization', 'Basic '+ localStorage.getItem('basic_token'));
          this.http.get(apiTokenUrl)
            .subscribe(data =>{ 
              console.log('token get',data);
              this.RestToken = JSON.stringify(data);
              console.log('rest token', this.RestToken);
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

  logout(){
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Accept','application/json');
        headers.append('X-CSRF-Token', this.CSRFToken);
        headers.append('Authorization', 'Basic '+ localStorage.getItem('basic_token'));

        this.http.post(this.apiUrl+'/user/logout?_format=json',{}, {headers: headers})
          .subscribe(res => {
            this.destroyUserCredentials();
          
          }, (err) => {
            reject(err);
          });
    });
  }
  

  loadUserData(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept','application/json');
    headers.append('X-CSRF-Token', this.RestToken);
    headers.append('Authorization', 'Basic '+ this.BasicAuthString);

    var UserData = this.http.get(this.apiUrl+'/user/'+ this.UserID+'?_format=json', {headers: headers,withCredentials:true})
    .map(res => { console.log('raw response',res); console.log('in userdata', res.json() ); return res.json(); });
    console.log('UserData loaded',UserData);
    return UserData;
  }

  assignDisplay(){ //preloading files on auth
    this.loadUserData().map(data => {
      this.displayData = data;
      this.displayImage = data.user_picture;
      this.displayFirstName = data.field_first_name.map(res => { console.log(res.value); return res.value;  });
      this.displayLastName =  data.field_last_name.map(res => { console.log(res.value); return res.value;  });
      this.displayCity =  data.field_city.map(res => { console.log(res.value); return res.value;  });
      this.displayRegion =  data.field_region.map(res => { console.log(res.value); return res.value;  });
      this.displayCountry =  data.field_country.map(res => { console.log(res.value); return res.value;  });
      this.displayMobile =  data.field_mobile_number.map(res => { console.log(res.value); return res.value;  });
      this.displayDesc =  data.field_short_description.map(res => { console.log(res.value); return res.value;  });
      this.displayEmail = data.mail.map(res => { console.log(res.value); return res.value;  });
      this.displayCreated = data.created.map(res => { console.log(res.value); return res.value;  });
    });
  }




  assignSelectedNID(data){
    this.SelectedNID = data;
    console.log(this.SelectedNID);
    return this.SelectedNID;
  }


  getlogs() {
    console.log('logout_token stored in LToken',this.LToken);
    console.log('csrf_token stored in CSRFToken',this.CSRFToken);
    console.log('uid stored in UserID',this.UserID);
    console.log('rest token stored in RestToken',this.RestToken);
  }

  getpostprocessLogs(){
    console.log('logout_token stored in LToken',this.LToken);
    console.log('csrf_token stored in CSRFToken',this.CSRFToken);
    console.log('uid stored in UserID',this.UserID);
    console.log('rest token stored in RestToken',this.RestToken);
  }

  logoutCredentialsCheck(){
    console.log('logout_token stored in LToken',this.LToken);
    console.log('csrf_token stored in CSRFToken',this.CSRFToken);
    console.log('uid stored in UserID',this.UserID);
    console.log('rest token stored in RestToken',this.RestToken);
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
    headers.append('Authorization', 'Basic '+ this.BasicAuthString);
  }

  saveProfileChanges(data){
    console.log('saveprofilechanges',data);
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Authorization', 'Basic '+ this.BasicAuthString);
      headers.append('Content-Type', 'application/json');
      headers.append('X-CSRF-Token', this.RestToken);

      this.http.patch(this.apiUrl+'/user/'+this.UserID+'?_format=json',JSON.stringify(data), {headers: headers})
        .subscribe(res => {
          console.log('saveprofilechange res',res);
          this.assignDisplay();
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

    


  /* uploadPhoto(data){
    console.log('saveprofilechanges',data);
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Authorization', 'Basic '+ this.BasicAuthString);
      headers.append('Content-Type', 'application/octet-stream');
      headers.append('Content-Dispositon', 'filename:'+data);

      this.http.post(this.apiUrl+'/file/upload/user/user/user_picture?_format=json',data, {headers: headers})
        .map(res => {
          console.log('upload',res);
          var reference = res.fid.value;
          this.http.patch(this.apiUrl+'/user/'+this.UserID+'?_format=json',JSON.stringify(reference), {headers: headers})
            .subscribe(res => {
              this.assignDisplay();
              resolve(res);
            }, (err) => {
              reject(err);
            });
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  } */

}
