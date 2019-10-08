import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router'; 
import { GlobalService } from '../services/global/global.service';
@Component({
  selector: 'app-modal',
  templateUrl: 'modal.page.html',
  styleUrls: ['modal.page.scss']
})
export class ModalPage {
  constructor(private router: Router,public modalController: ModalController,public globalService: GlobalService) {
  }

  dismiss() {
    this.modalController.dismiss();
  }
  reject(){
    this.router.navigateByUrl('/list');
    this.modalController.dismiss();
  }
  accept(){
    this.globalService.addOrderItem();
    this.router.navigateByUrl('/final');
    this.modalController.dismiss();
  }
}
