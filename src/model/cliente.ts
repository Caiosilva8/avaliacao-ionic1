export class Cliente {
    id : string;
    nome : String;
    telefone : String;
    email : String;


setDados(obj : any){
    this.nome = obj.nome;
    this.telefone = obj.telefone;
    this.email = obj.email;
    }
}