import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { Storage } from  '@ionic/storage';
import { GlobalService } from './services/global/global.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private  storage:  Storage,
    private router: Router,
    public globalService: GlobalService
  ) {    
    console.log("start...");
    this.storage.get('PRODUCT_LIST').then((val) => {
      if(val != null)
      {
        this.globalService.prod_List = val;
        console.log("success Product_List");
      }
    });
    this.storage.get('ORDER_LIST').then((val) => {
      if(val != null)
      {
        this.globalService.order_list = val;
        this.globalService.calculateOrderListSumPrice();
        console.log("success ORDER_LIST");
      }
    });
    this.storage.get('SEARCH_TYPE').then((val) => {
      if(val!=null)
      {
        this.globalService.searchType = val;
        console.log("success SEARCH_TYPE");
      }
    });
    this.storage.get('SELECTED_ITEM').then((val) => {
      if(val!=null)
      {
        this.globalService.selectedItemId = val;
        console.log("success SELECTED_ITEM");
      }
    });
    this.storage.get('USER_OrganizationName').then((val) => {
      if(val!=null)
      {
        this.globalService.OrganizationName = val;
        console.log("success USER_OrganizationName");
      }
    });
    this.initializeApp();
  }

  ngOnInit() {
  }

  initializeApp() {    
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.router.navigateByUrl('/login');
    });
  }
}
