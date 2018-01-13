
import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { VideolistPage } from '../videolist/videolist';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = VideolistPage;
  

  constructor() {

  }
}
