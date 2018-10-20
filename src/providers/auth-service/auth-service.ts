import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';


import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { ThrowStmt } from '@angular/compiler';


@Injectable()

export class AuthService {

  apiUrl: string ='http://127.0.0.1/drupal';
  public isLoggedIn = false;
  public CSRFToken: string;
  public LToken: string;
  public UserID: string;

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
              console.log('token get',data);
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
    headers.append('Accept','application/json');
    headers.append('X-CSRF-Token', localStorage.getItem('loggedin_token'));
    headers.append('Authorization', 'Basic '+ localStorage.getItem('basic_token'));

    var UserData = this.http.get(this.apiUrl+'/user/'+ this.UserID+'?_format=json', {headers: headers,withCredentials:true})
    .map(res => res.json());
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
    headers.append('Authorization', 'Basic '+ localStorage.getItem('basic_token'));
  }

  saveProfileChanges(data){
    console.log('saveprofilechanges',data);
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Authorization', 'Basic '+ localStorage.getItem('basic_token'));
      headers.append('Content-Type', 'application/json');

      this.http.patch(this.apiUrl+'/user/'+this.UserID+'?_format=json',JSON.stringify(data), {headers: headers})
        .subscribe(res => {
          this.assignDisplay();
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
        headers.append('Accept','application/json');
        headers.append('X-CSRF-Token', localStorage.getItem('loggedin_token'));
        headers.append('Authorization', 'Basic '+ localStorage.getItem('basic_token'));

        this.http.post(this.apiUrl+'/user/logout?_format=json',{}, {headers: headers})
          .subscribe(res => {
            this.destroyUserCredentials();
          
          }, (err) => {
            reject(err);
          });
    });
  }
  
}
