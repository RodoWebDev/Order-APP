/**
 * @author    Ionic Bucket <ionicbucket@gmail.com>
 * @copyright Copyright (c) 2018
 * @license   Fulcrumy
 * 
 * This file represents a provider of Menu Items,
 * File path - '../../services/menu-items/menu-items.service'
 */

import { Injectable } from '@angular/core';
import { Storage } from  '@ionic/storage';
import { url } from 'inspector';
import { isArray } from 'util';

@Injectable()

export class GlobalService {
  prod_List = [];
  result_List = [];
  order_list = [];
  searchType = 'item';
  searchText = "";
  selectedItemId = 0;
  orderListSumPrice = 0;
  signatureImage : "";
  signState = false;
  image64URI = null;
  OrganizationName = "";
  temp_item:any;
  signatureData:any;
  // baseUrl = 'https://www.quickform.com.br/';
  baseUrl = 'http://localhost:84/user/';
  imagePid = -1;
  imageIid = -1;
  constructor(private  storage:  Storage) {    
  }
  getBaseUrl(){
    return this.baseUrl;
  }
  setSignatureData(data){
    this.signatureData = data;
    if(this.signState)
      this.signatureData.signatureImage = this.signatureImage;
    else
      this.signatureData.signatureImage = "";
  }
  getSignatureData(){
    return this.signatureData;
  }
  getOrderList(){
    return this.order_list;
  }
  setItemImage(pid, iId,image){
    for(var i=0;i<this.order_list.length;i++)
    {
      if(pid == this.order_list[i].pid)
      {
        if(iId == 1)
          this.order_list[i].image1 = image;
        else if(iId == 2)
          this.order_list[i].image2 = image;
        else if(iId == 3)
          this.order_list[i].image3 = image;
      }
    }
  }
  setOrganizationName(val)
  {
    this.OrganizationName = val;
  }
  getOrganizationName(){
    return this.OrganizationName;
  }
  getSearchType(){
    return this.searchType;
  }
  setSearchType(val) {
    this.searchType = val;//1:item 2:desc
    this.storage.set("SEARCH_TYPE", this.searchType);
  }  
  addCount(pid){
    for(var i=0;i<this.order_list.length;i++)
    {
      if(pid == this.order_list[i].pid)
      {
        this.order_list[i].count++;
        this.saveOrderList(-1);
        this.calculateOrderListSumPrice();
        return;
      }
    }
  }
  minuseCount(pid){
    for(var i=0;i<this.order_list.length;i++)
    {
      if(pid == this.order_list[i].pid&&this.order_list[i].count>1)
      {
        this.order_list[i].count--;
        this.saveOrderList(-1);
        this.calculateOrderListSumPrice();
        return;
      }
    }    
  }
  
  addOrderItem(){
    // this.order_list = [];    
    for(var i=0;i<this.prod_List.length;i++)
    {
      if(this.selectedItemId == this.prod_List[i].pid)
      {
        var isExist = 0;
        for(var j=0;j<this.order_list.length;j++)
        {
          if(this.selectedItemId == this.order_list[j].pid)
          {//Exist OrderItem count++
            isExist = j;
            this.order_list[j].count += 1;
          }
        }
        if(isExist == 0)
        {//add new orderItem
          this.temp_item = this.prod_List[i];
          this.temp_item.count = 1;
          this.temp_item.image1 = "";
          this.temp_item.image2 = "";
          this.temp_item.image3 = "";
          this.temp_item.unit = "";
          this.order_list.push(this.temp_item);
        }
      }
    }
    this.saveOrderList(-1);
    this.calculateOrderListSumPrice();
  }
  deleteOrderItem(pid){
    for(var i=0;i<this.order_list.length;i++)
    {
      if(pid == this.order_list[i].pid)
      {
        this.order_list.splice(i, 1);
        this.saveOrderList(-1);
        this.calculateOrderListSumPrice();
        return;
      }
    }
  }
  saveOrderList(pid,val=0){
    if(pid != -1)
    {
      for(var i=0;i<this.order_list.length;i++)
      {
        if(pid == this.order_list[i].pid)
        {
          this.order_list[i].unit = val;
        }
      }
    }
    this.storage.set("ORDER_LIST", this.order_list);
  }
  calculateOrderListSumPrice(){
    // console.log("calculateOrderListSumPrice");
    this.orderListSumPrice = 0;
    for(var i=0;i<this.order_list.length;i++)
    {
      this.orderListSumPrice += this.order_list[i].SellingPrice*this.order_list[i].OnHandsQtd*this.order_list[i].count;
    }
  }
  getOrderListSumPrice(){
    return this.orderListSumPrice;
  }
  getCurrentOrderUnit(pid){
    for(var i=0;i<this.order_list.length;i++)
    {
      if(pid == this.order_list[i].pid)
      {
        return this.order_list[i].unit;
      }
    }
  }
  getPhoto(pid,num){
    // return this.signatureImage;
    for(var i=0;i<this.order_list.length;i++)
    {
      if(pid == this.order_list[i].pid)
      {
        if(num == 1)
        {
          return this.order_list[i].image1;
        }
        if(num == 2)
        {
          return this.order_list[i].image2;
        }
        if(num == 3)
        {
          return this.order_list[i].image3;
        }
      }
    }
  }
  getCurrentOrderItemPhoto(pid,num){
    for(var i=0;i<this.order_list.length;i++)
    {
      if(pid == this.order_list[i].pid)
      {
        if(num == 1)
        {
          if(this.order_list[i].image1=="")
            return true;
          else
            return false;
        }
        if(num == 2)
        {
          if(this.order_list[i].image2=="")
            return true;
          else
            return false;
        }
        if(num == 3)
        {
          if(this.order_list[i].image3=="")
            return true;
          else
            return false;
        }
      }
    }
  }
  setNoneImage(){
    this.signatureImage="";
    this.signState = false;
  }
  getImageState(){
    return this.signState;
  }
  setSignatureImage(image) {
    this.signatureImage = image;
    this.signState = true;
  }
  getSignatureImage(){
    return this.signatureImage;
  }
  setProdList(list){
    this.prod_List = list;
    this.storage.set("PRODUCT_LIST", this.prod_List);
  }
  getProdListFromStorage(){
    this.storage.get('PRODUCT_LIST').then((val) => {
      if(val != null)
        this.prod_List = val;
    });
  }
  getProdList(){
    return this.prod_List;
  }
  getResultList(){
    return this.result_List;
  }
  setFormatResultList(){
    this.result_List = [];
  }
  setResultList(val){
    this.result_List = val;
  }
  getSearchResult(){
    this.result_List = [];
    console.log(this.prod_List);
    console.log(this.OrganizationName);
    for(var i=0;i<this.prod_List.length;i++)
    {
      if(this.OrganizationName == this.prod_List[i].OrganizationName)
      {
        if(this.searchType == "item")
        {
          if(this.prod_List[i].Item.toLowerCase().indexOf(this.searchText.toLowerCase())!=-1)
          {
            this.result_List.push(this.prod_List[i]);
          }
        }
        else if(this.searchType == "desc")
        {
          if(this.prod_List[i].ItemDescription.toLowerCase().indexOf(this.searchText.toLowerCase())!=-1 || 
          this.prod_List[i].CrossReference.toLowerCase().indexOf(this.searchText.toLowerCase())!=-1)
          {
            this.result_List.push(this.prod_List[i]);
          }
        }
      }
    }
  }
  setSearchText(val){
    this.searchText = val;
    // if(val != "")
      // this.getSearchResult();
  }
  setItemId(val) {
    this.selectedItemId = val;
    this.storage.set("SELECTED_ITEM", this.selectedItemId);
  }
  getItem(){
    // console.log("prod_List"+this.prod_List);
    // console.log("selectedItemId"+this.selectedItemId);
    for(var i=0;i<this.prod_List.length;i++)
    {
      // console.log("selectedItemId" + this.selectedItemId);
      if(this.selectedItemId == this.prod_List[i].pid)
      {
        // console.log(this.prod_List[i]);
        return this.prod_List[i];
      }
    }
    // return this.prod_List[this.selectedItemId];
  }
  setImageData(pid,iId){
    this.imagePid = pid;
    this.imageIid = iId;
  }
  getImage(){
    // return this.signatureImage;
    for(var i=0;i<this.order_list.length;i++)
    {
      if(this.imagePid == this.order_list[i].pid)
      {
        if(this.imageIid == 1)
        {
          return this.order_list[i].image1;
        }
        if(this.imageIid == 2)
        {
          return this.order_list[i].image2;
        }
        if(this.imageIid == 3)
        {
          return this.order_list[i].image3;
        }
      }
    }
  }
  deleteCurrentImage(){
    for(var i=0;i<this.order_list.length;i++)
    {
      if(this.imagePid == this.order_list[i].pid)
      {
        if(this.imageIid == 1)
        {
          this.order_list[i].image1 = "";
        }
        if(this.imageIid == 2)
        {
          this.order_list[i].image2 = "";
        }
        if(this.imageIid == 3)
        {
          this.order_list[i].image3 = "";
        }
      }
    }
  }
}
// 2:
// CrossReference: "3W.0565.EH.44-AP"
// CustPrice: "10"
// Item: "3W.0565.EH.44-AP"
// ItemDescription: "CABLE BOT2"
// Location: "2,018,051"
// OnHandsQtd: "1"
// OrganizationName: "BOGOTA"
// SellingPrice: "47"
// Subinventary: "DEP01"
// Uom: "ea"
// image: null
// pid: "3"