import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import firebase from 'firebase';
import { Produto } from '../../model/produto';
import { InicioProdutoPage } from '../inicio-produto/inicio-produto';

@IonicPage()
@Component({
  selector: 'page-produto-visualiza',
  templateUrl: 'produto-visualiza.html',
})
export class ProdutoVisualizaPage {

  formGroup : FormGroup;

  firestore = firebase.firestore(); //Inicio um instancia do banco 
  settings = {timestampsInSnapshots : true} //linha sempre utilizada(padrão)
  produto : Produto = new Produto();

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public formBuilder : FormBuilder) {

      this.firestore.settings(this.settings);

      this.produto = this.navParams.get('produto');

      this.formGroup = this.formBuilder.group({
        nomeProduto : [this.produto.nomeProduto],
        preco : [this.produto.preco],
        categoria : [this.produto.categoria],
        descricao : [this.produto.descricao],
      })
  }

  atualizarP(){
    let ref = this.firestore.collection('produto')
    ref.doc(this.produto.id).set(this.formGroup.value)
    .then(()=>{
      console.log('Atualizado com Sucesso');
      this.navCtrl.push('InicioProdutoPage')
    }).catch(()=>{
      console.log('Erro ao Atualizar');
    })
  }

}
