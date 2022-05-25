import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {

  cadastrando: boolean 
  car: any = { id: Date.now(), descricao: '', preco: '' }
  model: any = { modelo: '', foto:'', quantidade: 1, carros: [] }
  brand: any = { marca: '', modelos: [] }
  
  carros: any = []

  stored_cars: any = []; all_brands: any = []; all_brand_models: any = []

  constructor(private router: Router) {
    //{"id":, "model":, "url": ""}
    this.stored_cars = {
      "Chevrolet":
      [
          {"id":1, "model": "Onix", "url":"https://i.imgur.com/CRuoTH8.png"},
          {"id":2, "model": "Cruze", "url":"https://i.imgur.com/f8gZpZG.png"},
          {"id":3, "model": "Camaro", "url": "https://i.imgur.com/NtiXKzC.png"},
          {"id":4, "model": "Tracker", "url:": "https://i.imgur.com/BYijx4y.png"},
          {"id":5, "model": "Spin", "url:": "https://i.imgur.com/RJl1nM0.png"},
          {"id":6, "model": "Trailblazer", "url": "https://i.imgur.com/bKaVuLI.png"}
      ],
      "Toyota":
      [
        {"id":1, "model": "Yaris", "url": "https://i.imgur.com/atQtwaL.png"},
        {"id":2, "model": "Corolla", "url": "https://i.imgur.com/PWXzxe7.png"},
        {"id":3, "model": "RAV4", "url": "https://i.imgur.com/b5lI5tX.png"},
      ],
      "Ford": 
      [
        {"id":1, "model":"Ranger", "url": "https://i.imgur.com/mVsVNWk.png"},
        {"id":2, "model":"Mustang", "url": "https://i.imgur.com/0ENPWHn.png"},
        {"id":3, "model":"Bronco", "url": "https://i.imgur.com/8uUSOj7.png"},
        {"id":4, "model":"Sport", "url": "https://i.imgur.com/epprFkr.png"},
      ],
      "Fiat":
      [
        {"id":1, "model":"Pulse", "url": "https://i.imgur.com/mz0Tini.png"},
        {"id":2, "model": "Toro", "url": "https://i.imgur.com/jJ8BZbK.png"},
        {"id":3, "model": "Cronos", "url": "https://i.imgur.com/ihi3xxu.png"},
        {"id":4, "model": "E500", "url": "https://i.imgur.com/ZcXDyAf.png"}
      ]
    }
    this.all_brands = Object.keys(this.stored_cars)
  }

  ionViewDidEnter(){
    this.carros = JSON.parse(localStorage.getItem('carros'))

    if (this.carros == null){
      this.carros = []
    }
    this.cadastrando = false
  }

  create() {
    if (this.checkForEmpty()) { return }
    this.cadastrando = true

    this.pushDataIntoArray()
    localStorage.setItem("carros", JSON.stringify(this.carros))
    this.clear()
    this.navigateTo_Principal()
  }

  pushDataIntoArray(){
    let brand_in = false; let model_in = false

    for (let b in this.carros){
      if(this.carros[b].marca == this.brand.marca){
        
        for (let m in this.carros[b].modelos){
          if(this.carros[b]['modelos'][m].modelo == this.model.modelo) {
            this.carros[b]['modelos'][m]['carros'].push(Object.assign({}, this.car))
            this.carros[b]['modelos'][m]['quantidade'] += 1

            model_in = true
            break
          }
        }

        if (!model_in){
          this.model['carros'].push(Object.assign({}, this.car))
          this.carros[b]['modelos'].push(Object.assign({}, this.model))
        }

        brand_in = true
        break
      }

    }

    if(!brand_in){
      console.log('brand not in')
      this.model['carros'].push(Object.assign({}, this.car))
      this.brand['modelos'].push(Object.assign({}, this.model))
      this.carros.push(Object.assign({}, this.brand))
      }

    }

  checkForEmpty() {
    let continue_not_allowed = false 
    if(this.brand.marca == ''){
      alert('Marca está vazio')
      continue_not_allowed = true
    }

    if (this.model.modelo == ''){
      alert('modelo está vazio')
      continue_not_allowed = true
    }

    if (this.car.descricao == ''){
      alert('Descrição está vazio')
      continue_not_allowed = true
    }

    if (this.car.preco == ''){
      alert('Preço está vazio')
      continue_not_allowed = true 
    }

    return continue_not_allowed
  }

  brandChange(){
    if (!this.cadastrando){
      this.all_brand_models = []
      this.model.modelo = ""

      this.model.foto = ""
      for(let model in this.stored_cars[this.brand['marca']]){
        this.all_brand_models.push(this.stored_cars[this.brand['marca']][model].model)
      }
    }
  }

  modelChange(){
    console.log(this.cadastrando)
    if (!this.cadastrando && this.model.modelo != ""){

      this.model.foto = ""
      this.model.foto = this.retrievePhoto(this.brand.marca, this.model.modelo)
    }
  }

  retrievePhoto(brand:string, model:string){
    return this.stored_cars[brand].find((e)=> e.model == model).url
  }

  clear(){
    this.brand.marca = ""
    this.model.modelo = ""
    this.model.foto = ""
    this.car.descricao = ""
    this.car.preco = ""
  }



  navigateTo_Principal(){
    this.router.navigate(['tabs/tab1']);
  }

}
