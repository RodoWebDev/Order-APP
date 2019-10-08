import { Component } from '@angular/core';
import { Router } from '@angular/router'; 
import { GlobalService } from '../services/global/global.service';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
@Component({
  selector: 'app-item',
  templateUrl: 'item.page.html',
  styleUrls: ['item.page.scss']
})
export class ItemPage {
  constructor( private router: Router, public globalService: GlobalService ,public modalCtrl: ModalController) {
  }
  public back() {
    this.router.navigateByUrl('/list');
  }
  
  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: ModalPage
    });
    return await modal.present();
  }

  public openModal() {
    this.presentModal();
  }
  public cart(){
    this.router.navigateByUrl('/final');
  }
}
