import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';

@Component({
  selector: 'project-post-form',
  templateUrl: 'project-post-form.html'
})
export class ProjectPostForm {

  public anArray:any=[];

  constructor(public navCtrl: NavController) {

  }

  

  gotoHomePage() {
    this.navCtrl.push(HomePage);
  }

  Confirmation(){

  }

  goTo(){
   console.log('this.anArray',this.anArray);
 
   }
 Add(){
   this.anArray.push({'value':''});
   }
}