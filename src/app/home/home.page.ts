import { Component } from '@angular/core';
import { Router } from '@angular/router'; 
import { GlobalService } from '../services/global/global.service';
import { Storage } from  '@ionic/storage';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage{
  constructor(
    private router: Router,
    public globalService: GlobalService,
    private storage:  Storage
  ) {
  }
  public toListPage(val) {
    this.globalService.setSearchType(val);
    this.router.navigateByUrl('/list');
  }
  public cart(){
    this.router.navigateByUrl('/final');
  }
  public logout(){
    this.storage.remove("USER_ID");
    this.storage.remove("USER_PW");
    this.storage.remove("PRODUCT_LIST");
    this.storage.remove("ORDER_LIST");
    this.storage.remove("SEARCH_TYPE");
    this.storage.remove("SELECTED_ITEM");
    this.storage.remove("USER_OrganizationName");
    this.router.navigateByUrl('/login');
  }
}
