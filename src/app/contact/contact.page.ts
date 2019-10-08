import { Component } from '@angular/core';
import { Router } from '@angular/router'; 
import { GlobalService } from '../services/global/global.service';
import { AlertController } from '@ionic/angular';
import { HttpClient } from  '@angular/common/http';
import { Storage } from  '@ionic/storage';
@Component({
  selector: 'app-contact',
  templateUrl: 'contact.page.html',
  styleUrls: ['contact.page.scss']
})
export class ContactPage{
  approveState = false;
  signature:any;
  buildingName="";
  address="";
  name="";
  idNumber="";
  telephone="";
  signatureData:any;
  order_list = [];
  data:any;
  public alert: any;
  constructor(private  storage:  Storage, private router: Router,private  httpClient:  HttpClient, public globalService: GlobalService ,public alertCtrl: AlertController) {
  }
  async presentAlert(hText,mText) {
    const alert = await this.alertCtrl.create({
      header: hText,
      message: mText,
      buttons: ['OK']
    });

    await alert.present();
    this.router.navigateByUrl('/final');
  }
  public back() {
    this.router.navigateByUrl('/final');
  }
  public approve(){
    this.router.navigateByUrl('/signature');
  }
  public postData(){
    this.signature={};
    this.signature.buildingName = this.buildingName;
    this.signature.address = this.address;
    this.signature.name = this.name;
    this.signature.idNumber = this.idNumber;
    this.signature.telephone = this.telephone;
    this.globalService.setSignatureData(this.signature);
    this.signatureData = this.globalService.getSignatureData();    
    this.order_list = this.globalService.getOrderList();
    var url = this.globalService.getBaseUrl()+'insertneworderlist';
    let postData = new FormData();
    this.storage.get('USER_ID').then((val) => {
      postData.append('email',val);
      postData.append('signatureData',JSON.stringify(this.signatureData));
      postData.append('order_list', JSON.stringify(this.order_list));
      this.data = this.httpClient.post(url, postData);
      this.data.subscribe(data =>{
        if(data.response=="Success")
        {
          this.presentAlert('Information','Success.');
        }
      }, error => {
        console.log(error);
        this.presentAlert('Error','The connection to Server failed,Please try again later');
      });
    });
  }
}
