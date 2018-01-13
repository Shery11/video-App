import { Component ,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,LoadingController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';
import { AngularFireDatabase} from 'angularfire2/database';


/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

	@ViewChild('username') uname;
	@ViewChild('password') password;

  constructor(private fire : AngularFireAuth ,public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, public loadingCtrl: LoadingController,public db: AngularFireDatabase	) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }


  register(){

     let loader = this.loadingCtrl.create({
          content: "Registering user please wait",
          duration: 3000
        });
     loader.present();

  	this.fire.auth.createUserWithEmailAndPassword(this.uname.value,this.password.value)
    .then((data)=>{

      loader.dismiss();

    	console.log(data.email);
      console.log(data.uid);

      // we have to push data with custpom key here
     this.db.list('/users').set(data.uid,{email:data.email}).then(()=>{
      console.log("user added");
     })

    	let alert = this.alertCtrl.create({
          title: 'User registered',
          subTitle: 'Please log In now',
          buttons: ['OK']
        });

        

        alert.present();
        this.navCtrl.push(LoginPage);
    }).catch(error =>{
      loader.dismiss();
    	console.log(error);
    	 let alert = this.alertCtrl.create({
          title: 'Error occured',
          subTitle: error.message,
          buttons: ['OK']
        });
        alert.present();  
    })
  	console.log(this.uname.value, this.password.value)

  }

  signIn(){
  	this.navCtrl.push(LoginPage);
  }

}