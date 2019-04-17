import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-livro',
  templateUrl: 'livro.html',
})
export class LivroPage {

  formGroup: FormGroup;

  firestore = firebase.firestore();
  settings = {timestampsInSnapshots : true}


  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public formBuilder : FormBuilder) {

      this.firestore.settings(this.settings);

      this.formGroup = this.formBuilder.group({
        titulo : [''],
        autor : [''],
        preco : [''],
        resumo : [''],
      })
  }

  cadastrar(){
    let ref = this.firestore.collection('livro')
    ref.add(this.formGroup.value)
    .then(resp=>{
      console.log('Cadastrado com Sucesso');
      this.navCtrl.setRoot('InicioLivroPage');
    }).catch(()=>{
      console.log('Erro ao Cadastrar');
    })
  }



}
