import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  //carro: any = {marca: '', modelo: '', foto:'', unique: []}
  

  carro: any = { id: Date.now(), marca:'', modelo:'', foto:'', descricao:'', preco:''}
  carros: any = []

  constructor(private router: Router) {}

  ngOnInit() {
    this.carros = JSON.parse(localStorage.getItem('carros'))

    if (this.carros == null){
      this.carros = []
    }
  }

  create() {
    if (this.checkForEmpty()) { 
      //this.clear()
      return 
    }

    this.carros.push(Object.assign({}, this.carro))
    localStorage.setItem("carros", JSON.stringify(this.carros))
  }

  checkForEmpty() {
    let continue_not_allowed = false
    for(let key in this.carro) {
      if (this.carro[key] == '') {
        //this.warnUserOf(key)
        continue_not_allowed = true
      }
    }
    return continue_not_allowed
  }

  //warnUserOf(empty_area:string) {}

  clear(){
    this.carro.marca = ''
    this.carro.modelo = ''
    this.carro.foto = ''
    this.carro.descricao = ''
    this.carro.preco = ''
  }

  button_Voltar(){
    this.router.navigate(['tabs/tab1']);
  }

}
