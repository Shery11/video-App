import { Component,ViewChild } from '@angular/core';
import { NavController,ModalController,App,LoadingController} from 'ionic-angular';
import { AngularFireDatabase} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Storage } from '@ionic/storage';


import { LoginPage } from '../login/login';





@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('signupSlider') signupSlider: any;
  @ViewChild('text') text;
  @ViewChild('title') title;
 
    // slideOneForm: FormGroup;
    sourceSelection;
    base64Images = [];
    uid;
    
    submitAttempt: boolean = false;

    scenes = [];
 
    constructor(public app: App,private fireauth: AngularFireAuth,public navCtrl: NavController, private modalCtrl: ModalController,public db: AngularFireDatabase,private storage: Storage,public loadingCtrl: LoadingController) {
             
         this.storage.get('uid').then((val) => {
          console.log('Your uid is', val);
          this.uid = val;
         });
             
    }
 
   
      save(){


         let loading = this.loadingCtrl.create({
            content: `<div class="custom-spinner-container">
                        <div class="custom-spinner-box">Saving Data</div>
                     </div>`
          });


         loading.present();

      
	 
	    if(this.title.value){

        console.log("success!")
        var obj = {
          title: this.title.value,
          scenes: this.scenes
        }
        console.log(obj);


           this.db.list('/users/'+this.uid).push(obj).then( () => {
              loading.dismiss();
              alert("datasaved");
              this.title.value="";
              this.scenes = [];
           })
      }
	    else {
        this.submitAttempt = true;
      }
 
    }


    saveScene(){

    	console.log(this.text.value);
    	 if(this.text.value !==""){


	    	this.scenes.push({
	    		text:this.text.value,
          scene: { slides : [] }
	    	});
         } 
    	this.text.value ="";

        console.log(this.scenes);
    }


    openModal(scene){

    	 let modal = this.modalCtrl.create('ModalPage', {scene:scene});
         modal.present();

         modal.onDidDismiss((data)=>{
            console.log(data);
            console.log(this.scenes);

         });

    }


    logout(){
      this.fireauth.auth.signOut();
      this.storage.clear();
      this.app.getRootNav().setRoot(LoginPage);
      
    }

}
