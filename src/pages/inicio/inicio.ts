import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import firebase from 'firebase';
import { Cliente } from '../../model/cliente';
import { query } from '@angular/core/src/animation/dsl';

@IonicPage()
@Component({
  selector: 'page-inicio',
  templateUrl: 'inicio.html',
})
export class InicioPage {

    listaDeClientes : Cliente[] = [];
    firestore = firebase.firestore(); //Inicio um instancia do banco 
    settings = {timestampsInSnapshots : true} //linha sempre utilizada(padrão)
    
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public menu : MenuController) {

      this.firestore.settings(this.settings); // Aplicar Conf.padrão
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad InicioPage');
    this.menu.enable(true)
    this.getList();
  }

  getList() {
    //selecionar a coleção(Dados que queremos listar), nesse caso = cliente 
    var ref = firebase.firestore().collection("cliente");

    ref.get().then(query =>{ // tenta realizar uma consulta 
      // "query" -> armazena os dados de retorno dentro da variável(no caso "query")
      query.forEach(doc =>{ // forEach -> percorrer os dados de query
        // doc = variavel que armazena um objeto de "query"
        let c = new Cliente(); //criando um objeto
        c.setDados(doc.data()); //Pega o obj firebase (any) e transformar para obj cliente
        c.id = doc.id;
        this.listaDeClientes.push(c); // pega o objeto cliente e adiciono na listas
      });
    });
  }

  novoCliente(){
    this.navCtrl.push('NovoClientePage')
  }

  


  remove(obj : Cliente){
    var ref = firebase.firestore().collection("cliente");
    ref.doc(obj.id).delete()
    .then(()=>{
      this.listaDeClientes = [];
      this.getList();
    }).catch(()=>{
      console.log('Erro ao Atualizar');
    })
  }

  atualiza(obj : Cliente){
    this.navCtrl.push('ClienteVisualizaPage',{'cliente' : obj})
  }
}
