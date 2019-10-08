import { Component } from '@angular/core';
import { Router } from '@angular/router'; 
import { GlobalService } from '../services/global/global.service';
import { ModalPage } from '../modal/modal.page';
import { ModalController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-final',
  templateUrl: 'final.page.html',
  styleUrls: ['final.page.scss']
})
export class FinalPage {
  image64URI = null;
  constructor( private router: Router, public globalService: GlobalService,public modalCtrl: ModalController ,private camera: Camera,private alertCtrl: AlertController) {
  }
  public back() {
    this.router.navigateByUrl('/list');
  }
  public setUnit(val,pid){
    this.globalService.saveOrderList(pid,val);
  }
  public continue(){
    this.router.navigateByUrl('/contact');
  }
  public deleteItem(pid){
    this.globalService.deleteOrderItem(pid);
  }
  public addCount(pid){
    this.globalService.addCount(pid);
  }
  public minuseCount(pid){
    this.globalService.minuseCount(pid);
  }
  public goImage(pid,iId){
    this.globalService.setImageData(pid,iId);
    this.router.navigateByUrl('/image');
  }
  public getPhoto(pid,iId){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
        this.image64URI = imageData;
        let imageRef = "";
        var metadata = {
          contentType: 'image/jpg',
          cacheControl: "public, max-age=31536000",
        };            
        imageRef = 'data:image/jpeg;base64,' + this.image64URI;
        this.image64URI = imageRef;
        this.globalService.setItemImage(pid,iId,this.image64URI);
    }, (err) => {
        this.showAlert("Camera error.", "Error");
    });
  }
  async showAlert(text, title) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: text,
      buttons: ['OK']
    });
    await alert.present();
  }
}