import { Component } from '@angular/core';
import { NavController,AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';

@Component({
  selector: 'project-post-form',
  templateUrl: 'project-post-form.html'
})
export class ProjectPostFormPage {

  PostProjectData = {
    "field_project_type":{
      "value":""
    }
  }

  public anArray:any=[];

  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {

  }

  

  gotoHomePage() {
    this.navCtrl.push(HomePage);
  }

  postProject() {
    const alert = this.alertCtrl.create({
      title: 'Project Posted!',
      subTitle: 'Your Project has been posted! Please wait for updates on the notification page!',
      buttons: ['OK']
    });
    alert.present();
  }

  goTo(){
   console.log('this.anArray',this.anArray);
 
   }
 Add(){
   this.anArray.push({'value':''});
   }


   saveProject(){
   
    
  }
}