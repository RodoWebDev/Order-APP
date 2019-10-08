import { Component } from '@angular/core';
import { Router } from '@angular/router'; 
import { GlobalService } from '../services/global/global.service';
import { HttpClient } from  '@angular/common/http';
import { Storage } from  '@ionic/storage';
import { AlertController} from '@ionic/angular';
@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage{
  searchText="";
  data:any;
  constructor( private  storage:  Storage,private  httpClient:  HttpClient, private router: Router, public globalService: GlobalService ,public alertCtrl: AlertController) {
    this.search();
  }
  ionViewDidLoad() {
    this.search();
  }
  public back() {
    this.router.navigateByUrl('/home');
  }
  public showItem(id){
    this.globalService.setItemId(id);
    // console.log(id);
    this.router.navigateByUrl('/item');
  }
  public search(){
    if(this.searchText=="")
    {
      this.globalService.setFormatResultList();
      return;
    }
    var url = this.globalService.getBaseUrl()+'orderappsearchtext';
    let postData = new FormData();
    this.storage.get('USER_ID').then((val) => {
      if(val != null && val != "")
      {
        postData.append('email',val);
        postData.append('searchText',this.searchText);
        postData.append('searchType',this.globalService.getSearchType());
        this.data = this.httpClient.post(url, postData);
        this.data.subscribe(data =>{
          this.data = JSON.stringify(data);
          this.globalService.setResultList(eval(data).data);
        }, error => {
          console.log(error);
          var mainText = 'The connection to '+url+' Server failed,It will works in Offline state';
          this.presentAlert('Error',mainText);
          this.globalService.getSearchResult();
        });
      }
      // else
      // {
        // this.globalService.setOrganizationName("BOGOTA1");
        // console.log("boso");
        // this.globalService.getSearchResult();        
      // }
    });
  }
  public cart(){
    this.router.navigateByUrl('/final');
  }
  async presentAlert(hText,mText) {
    const alert = await this.alertCtrl.create({
      header: hText,
      message: mText,
      buttons: ['OK']
    });
    await alert.present();
  }
}
