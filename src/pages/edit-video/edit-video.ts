import { Component,ViewChild } from '@angular/core';
import { IonicPage,NavController,ModalController,App,LoadingController,NavParams} from 'ionic-angular';
import { AngularFireDatabase} from 'angularfire2/database';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the EditVideoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-video',
  templateUrl: 'edit-video.html',
})
export class EditVideoPage {

	@ViewChild('signupSlider') signupSlider: any;
  @ViewChild('text') text;
    // @ViewChild('title') title;

    title;
 
    
    sourceSelection;
    base64Images = [];
    uid;
    submitAttempt: boolean = false;
    scenes = [];
 


   data;

  constructor(public app: App,public navParams:NavParams ,public navCtrl: NavController, private modalCtrl: ModalController,public db: AngularFireDatabase,private storage: Storage,public loadingCtrl: LoadingController) {
  	this.data = this.navParams.get('data');

  	 this.storage.get('uid').then((val) => {
	      console.log('Your uid is', val);
	      this.uid = val;
	     
	   });

  	console.log(this.data);
  	
  	this.title = this.data.title;
     
     if(this.data.scenes){
       this.scenes = this.data.scenes;
     }else{
       this.scenes = [];
     }

  	
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditVideoPage');
  }



   save(){


      	console.log(this.scenes);
      	console.log(this.title);


         let loading = this.loadingCtrl.create({
            content: `<div class="custom-spinner-container">
                        <div class="custom-spinner-box">Saving Data</div>
                     </div>`
          });


         loading.present();

      
	 
	    if(this.title && this.uid){

        console.log("success!")
        var obj = {
          title: this.title,
          scenes: this.scenes
        }
        console.log(obj);
        console.log(this.data.key);


           this.db.list('/users/'+this.uid).update(this.data.key,obj).then( () => {
              loading.dismiss();
              alert("datasaved");
              // this.title="";
              // this.scenes = [];
           }).catch(err => {
             alert(err);
             loading.dismiss();
           	console.log(err, 'You do not have access!')}
           );
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

    deleteSlide(index){
    	console.log(index);
      console.log(this.scenes.splice(index,1)); 
    }


    openModal(scene){

    	 let modal = this.modalCtrl.create('ModalPage', {scene:scene});
         modal.present();

         modal.onDidDismiss((data)=>{
            console.log(data);
            console.log(this.scenes);

         });

    }

}
