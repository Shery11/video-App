import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VideolistPage } from './videolist';

@NgModule({
  declarations: [
    VideolistPage,
  ],
  imports: [
    IonicPageModule.forChild(VideolistPage),
  ],
})
export class VideolistPageModule {}
