import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { Produto } from '../../model/produto';
import firebase from 'firebase';
import { query } from '@angular/core/src/animation/dsl';


@IonicPage()
@Component({
  selector: 'page-inicio-produto',
  templateUrl: 'inicio-produto.html',
})
export class InicioProdutoPage {


  listaDeProdutos : Produto[] = [];
  firestore = firebase.firestore();
  settings = {timestampsInSnapshots : true} //linha sempre utilizada(padrão)
  
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public menu : MenuController) {

      this.firestore.settings(this.settings); // Aplicar Conf.padrão
  }


  ionViewDidLoad() {
    this.menu.enable(true)
    this.getListProduto();
  }

  getListProduto(){
    var ref = firebase.firestore().collection("produto");

    ref.get().then(query=>{
      query.forEach(doc=>{
        let p = new Produto();
        p.setDados(doc.data());
        p.id = doc.id;
        this.listaDeProdutos.push(p);
      })
    })
  }

  novoProduto(){
    this.navCtrl.push('ProdutoPage')
  }

  remove(obj : Produto){
    var ref = firebase.firestore().collection("produto");
    ref.doc(obj.id).delete()
    .then(()=>{
      this.listaDeProdutos = [];
      this.getListProduto();
    }).catch(()=>{
      this.navCtrl.push('ProdutoVisualizaPage',{'produto' : obj})
    })
  }

  atualiza(obj : Produto){
    this.navCtrl.push('ProdutoVisualizaPage',{'produto' : obj})
  }

}
