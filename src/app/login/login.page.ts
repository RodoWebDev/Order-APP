import { MenuController , NavController, AlertController} from '@ionic/angular';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router'; 
import { HttpClient } from  '@angular/common/http';
import { Storage } from  '@ionic/storage';
import { GlobalService } from '../services/global/global.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
  email="";
  password="";
  error="";
  data:any;
  url = '';
  constructor(public navCtrl: NavController, 
    private menuCtrl: MenuController,
    private router: Router,
    private  httpClient:  HttpClient, 
    private  storage:  Storage,
    public globalService: GlobalService,
    public alertCtrl: AlertController
  ) {
    this.url = this.globalService.getBaseUrl() +'orderapplogin';
    storage.get('USER_ID').then((val) => {
      if(val != null && val != "")
      {
        let postData = new FormData();
        postData.append('email',val);
        this.storage.get('USER_PW').then((val) => {
          if(val != null && val != "")
          {
            postData.append('password',val);
            this.data = this.httpClient.post(this.url, postData);
            this.data.subscribe(data =>{
              var responseData = JSON.stringify(data);
              responseData = eval(data);
              var error = eval(responseData).error;
              var response = eval(responseData).response;
              if(error=="invalid arguments")
              {
                this.error = "invalid arguments";
              }
              else if(error=="invalid data")
              {
                this.error = "invalid data";
              }
              else if(error=="invalid arguments - 702")
              {
                this.error = "invalid arguments - 702";
              }
              else if(response=="invalid arguments - 703")
              {
                this.error = "invalid arguments - 703";
              }
              else if(response=="UserAuthError")
              {
                this.error = "UserAuthError";
              }
              else if(response=="Success")
              {
                this.error = "Success";
                this.data = JSON.stringify(data);
                var OrganizationName = eval(data).OrganizationName;
                this.globalService.setOrganizationName(OrganizationName);
                this.storage.set("USER_OrganizationName", OrganizationName);
                var data = eval(data).data;
                this.globalService.setProdList(data);
                this.router.navigateByUrl('/home');
              }
            }, error => {
              this.router.navigateByUrl('/home');
            });
          }
        });
      }
      console.log('Your USER_ID is', val);
    });
  }
  public login() {    
    let postData = new FormData();
    postData.append('email',this.email);
    postData.append('password',this.password);
    this.data = this.httpClient.post(this.url, postData);
    console.log('Your email is', this.email);
    console.log('Your password is', this.password);
    this.data.subscribe(data =>{
      var responseData = JSON.stringify(data);
      responseData = eval(data);
      var error = eval(responseData).error;
      var response = eval(responseData).response;
      console.log('Your error is', error);
      console.log('Your response is', response);
      if(error=="invalid arguments")
      {
        this.error = "invalid arguments";
      }
      else if(error=="invalid data")
      {
        this.error = "invalid data";
      }
      else if(error=="invalid arguments - 702")
      {
        this.error = "invalid arguments - 702";
      }
      else if(response=="invalid arguments - 703")
      {
        this.error = "invalid arguments - 703";
      }
      else if(response=="UserAuthError")
      {
        this.error = "UserAuthError";
      }
      else if(response=="Success")
      {
        this.error = "Success";
        this.storage.set("USER_ID", this.email);
        this.storage.set("USER_PW", this.password);
        this.data = JSON.stringify(data);
        var OrganizationName = eval(data).OrganizationName;
        this.globalService.setOrganizationName(OrganizationName);
        this.storage.set("USER_OrganizationName", OrganizationName);
        var data = eval(data).data;
        this.globalService.setProdList(data);
        this.router.navigateByUrl('/home');
      }
    }, error => {
      var mainText = 'The connection to '+this.url+' Server failed,Please try again later';
      this.presentAlert('Error',mainText);
    });
  }
  ngOnInit() {
    this.menuCtrl.enable(false);
  }
  ngOnDestroy() {
  }
  async presentAlert(hText,mText) {
    const alert = await this.alertCtrl.create({
      header: hText,
      message: mText,
      buttons: ['OK']
    });
    await alert.present();
  }
}
