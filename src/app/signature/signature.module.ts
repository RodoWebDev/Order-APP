import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SignaturePage } from './signature.page';
import { MenuController , NavController, AlertController} from '@ionic/angular';

import { SignaturePadModule } from 'angular2-signaturepad'; 

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: SignaturePage }]),
    SignaturePadModule
  ],
  declarations: [SignaturePage]
})
export class SignaturePageModule {
  constructor(public navCtrl: NavController, 
    private alertCtrl: AlertController,
    private menuCtrl: MenuController
  ) {
    // this.menuCtrl.enable(true);
  }
}
