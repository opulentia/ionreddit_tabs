import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RedditService } from "../../app/services/reddit.service"
import { DetailsPage } from "../details/details"

@Component({
  selector: 'reddits',
  templateUrl: 'reddits.html'
})
export class RedditsPage {
  item: any;
  category: any;
  limit: any;
  constructor(public navCtrl: NavController, private redditService: RedditService) {
    this.getDefaults();
  }

  ngOnInit(){
    this.getPost(this.category, this.limit);
  }

  getDefaults() {

    if(localStorage.getItem("category") != null){
        this.category = localStorage.getItem("category");
    } else {
        this.category = "sports";
    }
    
    if(localStorage.getItem("limit") != null){
        this.limit = localStorage.getItem("limit");
    } else {
        this.limit = 10;
    }
  }

  getPost(category, limit){
    this.redditService.getPosts(category, limit).subscribe(response => {
        this.item = response.data.children;
    });
  }

  viewItem(item){
    this.navCtrl.push(DetailsPage,{
        item:item
    });
  }

  changeCategory(){
    this.getPost(this.category, this.limit);
  }

}
