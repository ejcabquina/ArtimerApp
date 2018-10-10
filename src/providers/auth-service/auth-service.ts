import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map'

@Injectable()

export class AuthService {

  apiUrl: string =  'http://dev-artimer.pantheonsite.io';
  public isLoggedIn = false;
  public CSRFToken: string;
  public LToken: string;
  public UserID: string;

  public displayImg: string;
  public displayName: string;
  public displayInfo: string;
  public displayDesc: string;
  public displayEmail: string;


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
 
    this.http.post(this.apiUrl+'/user/login?_format=json',JSON.stringify(credentials),{headers: headers}).subscribe(res => {
        let apiTokenUrl = this.apiUrl+'/rest/session/token';
        this.storeLOtoken(res.json().logout_token);
        this.storeUserCredentials(res.json().csrf_token);
        this.storeUserID(res.json().current_user.uid);
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
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('Accept','application/json');

    var readData = this.http.get(this.apiUrl+'/user/'+ this.UserID+'?_format=json', {headers: headers,withCredentials:true}).map(data =>data.json());
    return readData;
  }

  assignDisplay(){ //preloading files on auth
    this.loadUserData().subscribe(data => {
      this.displayImg = data.user_picture;
      this.displayName = data.field_name;
      this.displayInfo = data.field_address; 
      this.displayDesc = data.field_short_description; 
      this.displayEmail = data.mail;
      console.log('displayinfo',this.displayInfo);
      console.log('displayName',this.displayName);
      console.log('displayimage',this.displayImg);
      console.log('displaymail',this.displayEmail);
      console.log('displaydesc',this.displayDesc);
    });
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
  }

  createAuthorization(headers: Headers) {
    headers.append('Authorization', localStorage.getItem('loggedin_token'));
  }

  saveProfileChanges(data){
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
      headers.append('Accept', 'application/hal+json');
      headers.append('Content-Type', 'application/hal+json');
      headers.append('X-CSRF-Token', localStorage.getItem('loggedin_token'));

      this.http.post(this.apiUrl+'/user/'+this.UserID+'/edit',JSON.stringify(data), {headers: headers, withCredentials:true})
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

        this.http.post(this.apiUrl+'/user/register?_format=json', JSON.stringify(data), {headers: headers})
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

        this.http.post(this.apiUrl+'/user/logout',{}, {headers: headers, withCredentials:true})
          .subscribe(res => {
            this.destroyUserCredentials();
          
          }, (err) => {
            reject(err);
          });
    });
  }
  
}
