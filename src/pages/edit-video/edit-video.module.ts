import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditVideoPage } from './edit-video';

@NgModule({
  declarations: [
    EditVideoPage,
  ],
  imports: [
    IonicPageModule.forChild(EditVideoPage),
  ],
})
export class EditVideoPageModule {}
