import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { Livro } from '../../model/livro';
import firebase from 'firebase';
import { query } from '@angular/core/src/animation/dsl';

@IonicPage()
@Component({
  selector: 'page-inicio-livro',
  templateUrl: 'inicio-livro.html',
})
export class InicioLivroPage {


  listaDeLivros : Livro[] = [];
  firestore = firebase.firestore();
  settings = {timestampsInSnapshots : true}



  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public menu : MenuController) {

      this.firestore.settings(this.settings);
  }

  ionViewDidLoad() {
    this.menu.enable(true)
    this.getListLivro();
  }

  getListLivro(){
    var ref = firebase.firestore().collection("livro");

    ref.get().then(query=>{
      query.forEach(doc=>{
        let l = new Livro();
        l.setDados(doc.data());
        l.id = doc.id;
        this.listaDeLivros.push(l);
      })
    })
  }

  novoLivro(){
    this.navCtrl.push('LivroPage')
  }

  remove(obj : Livro){
    var ref = firebase.firestore().collection("livro");
    ref.doc(obj.id).delete()
    .then(()=>{
      this.listaDeLivros = [];
      this.getListLivro();
    }).catch(()=>{
      this.navCtrl.push('LivroVisualizaPage',{livro : obj})
    })
  }

  atualiza(obj : Livro){
    this.navCtrl.push('LivroVisualizaPage',{livro : obj})
  }

}
