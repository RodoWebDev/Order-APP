import { Component ,ViewChild} from '@angular/core';
import { Router } from '@angular/router'; 
import { GlobalService } from '../services/global/global.service';
import {SignaturePad} from 'angular2-signaturepad/signature-pad';
@Component({
  selector: 'app-signature',
  templateUrl: 'signature.page.html',
  styleUrls: ['signature.page.scss'],
  providers: [SignaturePad]
})
export class SignaturePage{
  @ViewChild(SignaturePad) public signaturePad : SignaturePad;
  public signaturePadOptions : Object = {
    'minWidth': 2,
    'canvasWidth': 334,
    'canvasHeight': 500
  };
  public signatureImage : string;
  public Cancel: string;
  constructor( private router: Router, public globalService: GlobalService ) {
  }
  public back() {
    this.router.navigateByUrl('/contact');
  }
  public canvasResize() {
    let canvas = document.querySelector('canvas');
    this.signaturePad.set('minWidth', 1);
    this.signaturePad.set('canvasWidth', canvas.offsetWidth);

    this.signaturePad.set('canvasHeight', canvas.offsetHeight);
  }
  public ngAfterViewInit() {
    if(this.globalService.getSignatureImage()!="")
      this.signaturePad.fromDataURL(this.globalService.getSignatureImage());
  }
  public drawComplete() {
    this.signatureImage = this.signaturePad.toDataURL();
    this.globalService.setSignatureImage(this.signatureImage);
    this.router.navigateByUrl('/contact');
  }
  public drawClear() {
    this.globalService.setNoneImage();
    this.signaturePad.clear();
  }
}
