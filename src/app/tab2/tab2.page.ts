import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { all_cars_file } from './carros'

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  car: any = { descricao: '', preco: '' }
  model: any = { modelo: '', foto:'', quantidade: 1, carros: [] }
  brand: any = { marca: '', modelos: []}
  
  carros: any = []

  all_brands: any = []

  constructor(private router: Router) {}

  ngOnInit() {
    for (let key in all_cars_file) { this.all_brands.push(key) }

    this.carros = JSON.parse(localStorage.getItem('carros'))

    if (this.carros == null){
      this.carros = []
    }
  }

  create() {
    this.model.foto = "https://bobbyhadz.com/images/blog/typescript-create-type-from-object-keys/banner.webp"
    if (this.checkForEmpty()) { 
      return 
    }

    this.pushDataIntoArray()
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


  //warnUserOf(empty_area:string) {}

  button_Voltar(){
    this.router.navigate(['tabs/tab1']);
  }

}
