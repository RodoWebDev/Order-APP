import { Component } from '@angular/core';
import { Router } from '@angular/router'; 
import { GlobalService } from '../services/global/global.service';
@Component({
  selector: 'app-image',
  templateUrl: 'image.page.html',
  styleUrls: ['image.page.scss']
})
export class ImagePage{
  searchText="";
  data:any;
  constructor( private router: Router, public globalService: GlobalService ) {
  }
  public back() {
    this.router.navigateByUrl('/final');
  }
  public delete(){
    this.globalService.deleteCurrentImage();
    this.router.navigateByUrl('/final');
  }
}
