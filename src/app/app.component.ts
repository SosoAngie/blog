import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(){
    var config = {
      apiKey: "AIzaSyClSAMpAPs1-FavgxU5AKcdy_Ku5NpbuVA",
      authDomain: "blog-c2325.firebaseapp.com",
      databaseURL: "https://blog-c2325.firebaseio.com",
      projectId: "blog-c2325",
      storageBucket: "blog-c2325.appspot.com",
      messagingSenderId: "519873101241"
    };
    firebase.initializeApp(config);
  }
}
