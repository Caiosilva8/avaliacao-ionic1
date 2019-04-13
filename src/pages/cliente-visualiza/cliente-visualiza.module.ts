import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClienteVisualizaPage } from './cliente-visualiza';

@NgModule({
  declarations: [
    ClienteVisualizaPage,
  ],
  imports: [
    IonicPageModule.forChild(ClienteVisualizaPage),
  ],
})
export class ClienteVisualizaPageModule {}
