import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ImagePage } from './image.page';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: ImagePage }])
  ],
  declarations: [ImagePage]
})
export class ImagePageModule {
  constructor(
  ) {
    // this.menuCtrl.enable(true);
  }
}
