import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,App } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AngularFireDatabase} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';


import { LoginPage } from '../login/login';
import { EditVideoPage } from '../edit-video/edit-video';




/**
 * Generated class for the VideolistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-videolist',
  templateUrl: 'videolist.html',
})
export class VideolistPage {

	uid;
	videos;

  constructor(public app: App,public navCtrl: NavController,private fireauth: AngularFireAuth, public navParams: NavParams,public db: AngularFireDatabase,private storage: Storage) {

  	  this.storage.get('uid').then((val) => {
	      console.log('Your uid is', val);
	      this.uid = val;
	      this.videos = db.list('users/'+this.uid).snapshotChanges().map(changes => {
           // console.log(changes);
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        });
	      console.log(this.videos);
	   });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VideolistPage');
    console.log(this.uid);
  }


  deleteVideo(key){
    console.log(key);
     if(key){
     
      this.db.list('users/'+this.uid).remove(key).then(_ => alert('success'))
      .catch(err => alert(err));
     
     }else{
       alert("Unable to delete");
     }
     
  }


  editVideo(video){
    console.log(video);
    this.navCtrl.push(EditVideoPage,{data:video});
  }
   


   logout(){
      this.fireauth.auth.signOut();
      this.storage.clear();
      this.app.getRootNav().setRoot(LoginPage);
      
    } 
}
