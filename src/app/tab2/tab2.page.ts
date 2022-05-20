import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  carro: any = { id: Date.now(), marca:'', modelo:'', foto:'', descricao:'', preco:'' }
  carros: any = []

  constructor(private router: Router) {}

  ngOnInit() {
    this.carros = JSON.parse(localStorage.getItem('carros'))

    if (this.carros == null){
      this.carros = []
    }
  }

  create() {
    let image = "https://w7.pngwing.com/pngs/466/83/png-transparent-fiat-uno-car-suzuki-ignis-fiat-600-compact-car-car-subcompact-car.png"
    this.carro.foto = image
    if (this.checkForEmpty()) { 
      return 
    }

    this.carros.push(Object.assign({}, this.carro))
    localStorage.setItem("carros", JSON.stringify(this.carros))
  }

  checkForEmpty() {
    let continue_not_allowed = false
    for(let key in this.carro) {
      if (this.carro[key] == '') {
        this.warnUserOf(key)
        continue_not_allowed = true
      }
    }
    return continue_not_allowed
  }

  warnUserOf(empty_area:string) {
    this.carro[empty_area] = 12

  }


  button_Voltar(){
    this.router.navigate(['tabs/tab1']);
  }

}
