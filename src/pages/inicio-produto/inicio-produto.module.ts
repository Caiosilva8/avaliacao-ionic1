import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InicioProdutoPage } from './inicio-produto';

@NgModule({
  declarations: [
    InicioProdutoPage,
  ],
  imports: [
    IonicPageModule.forChild(InicioProdutoPage),
  ],
})
export class InicioProdutoPageModule {}
