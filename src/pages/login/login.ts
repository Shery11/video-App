import { Component , ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { RegisterPage } from '../register/register';
import { TabsPage } from '../tabs/tabs';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

 
	@ViewChild('username') uname;
	@ViewChild('password') password;

  constructor(private fireauth: AngularFireAuth ,public navCtrl: NavController,public alertCtrl: AlertController, public loadingCtrl: LoadingController,private storage: Storage) {

  }

   
   signIn(){
      let loader = this.loadingCtrl.create({
          content: "Logging in please wait"
        });
     loader.present();
     this.fireauth.auth.signInWithEmailAndPassword(this.uname.value, this.password.value).then((data)=>{
        console.log(data.uid);

        this.storage.set('uid', data.uid).then(data=>{
          console.log(data);
           loader.dismiss();
           this.navCtrl.setRoot(TabsPage);
        });
        

       

     }).catch(error =>{
          console.log(error);
          loader.dismiss();
          let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: error.message,
          buttons: ['OK']
        });
        alert.present();  

     })
   
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }


  register(){
  	this.navCtrl.push(RegisterPage);
  }

}