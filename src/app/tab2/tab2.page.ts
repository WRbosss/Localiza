import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {

  cadastrando: boolean = false

  car: any = { descricao: '', preco: '' }
  model: any = { modelo: '', foto:'', quantidade: 1, carros: [] }
  brand: any = { marca: '', modelos: []}
  
  carros: any = []

  stored_cars: any = []
  all_brands: any = []
  all_brand_models: any = []

  constructor(private router: Router) {
    this.stored_cars = {
      "Chevrolet":
      [
          {"id":1, "model": "Onix", "url":"https://www.chevrolet.com.br/content/dam/chevrolet/mercosur/brazil/portuguese/index/cars/cars-subcontent/04-images/novo-onix-branco-summit.png?imwidth=419%22%7D"},
          {"id":2, "model": "Cruze", "url":"https://secure-developments.com/commonwealth/brasil/gm_forms/assets/front/images/jellys/61eb1d424183d.png"}
      ],
      "Fiat":
      [
  
      ]
    }

    this.all_brands = Object.keys(this.stored_cars)
  }

  ngOnInit() {
    this.carros = JSON.parse(localStorage.getItem('carros'))

    if (this.carros == null){
      this.carros = []
    }
  }

  create() {
    if (this.checkForEmpty()) { return }

    this.cadastrando = true

    this.pushDataIntoArray()
    localStorage.setItem("carros", JSON.stringify(this.carros))
    this.clear()
    this.button_Voltar()
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
      console.log('brand changing')
      this.model.foto = ""
      this.all_brand_models = []
      for(let model in this.stored_cars[this.brand['marca']])
      {
        this.all_brand_models.push(this.stored_cars[this.brand['marca']][model].model)
      }
    }
  }

  modelChange(){
    console.log(this.cadastrando)
    if (!this.cadastrando){
      console.log('model changing')
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

  ionViewDidEnter(){
    this.cadastrando = false
  }

  //warnUserOf(empty_area:string) {}

  button_Voltar(){
    this.router.navigate(['tabs/tab1']);
  }

}
