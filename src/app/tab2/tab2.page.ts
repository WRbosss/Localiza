import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {

  cadastrando: boolean
  car: any = { descricao: '', preco: '' }
  model: any = { nome: '', foto: '', carros: [] }
  brand: any = { nome: '', modelos: [] }

  carros: any = []
  continue_not_allowed: Boolean = true

  //carros pré-definidos, removendo a necessidade de adicionar manualmente.
  stored_cars: any = [];
  selected_brand_models: any [] = [];

  constructor(public toastController: ToastController, private router: Router) {
    //atribuindo valores à variável.
    this.stored_cars = {
      "Chevrolet":
        [
          { "model": "Onix", "url": "https://i.imgur.com/CRuoTH8.png" },
          { "model": "Cruze", "url": "https://i.imgur.com/f8gZpZG.png" },
          { "model": "Camaro", "url": "https://i.imgur.com/NtiXKzC.png" },
          { "model": "Trailblazer", "url": "https://i.imgur.com/bKaVuLI.png" }
        ],
      "Toyota":
        [
          { "model": "Yaris", "url": "https://i.imgur.com/atQtwaL.png" },
          { "model": "Corolla", "url": "https://i.imgur.com/PWXzxe7.png" },
          { "model": "RAV4", "url": "https://i.imgur.com/b5lI5tX.png" },
        ],
      "Ford":
        [
          { "model": "Ranger", "url": "https://i.imgur.com/mVsVNWk.png" },
          { "model": "Mustang", "url": "https://i.imgur.com/0ENPWHn.png" },
          { "model": "Bronco", "url": "https://i.imgur.com/8uUSOj7.png" }
        ],
      "Fiat":
        [
          { "model": "Pulse", "url": "https://i.imgur.com/mz0Tini.png" },
          { "model": "Toro", "url": "https://i.imgur.com/jJ8BZbK.png" },
          { "model": "Cronos", "url": "https://i.imgur.com/ihi3xxu.png" },
          { "model": "E500", "url": "https://i.imgur.com/ZcXDyAf.png" }
        ],
      "Hyundai":
        [
          { "model": "Sport", "url": "https://i.imgur.com/epprFkr.png" }
        ]
    }
    for (let key of Object.keys(this.stored_cars)){
      console.log(key)
    }

  }

  ionViewDidEnter() {
    this.carros = JSON.parse(localStorage.getItem('carros'))

    if (this.carros == null) {
      this.carros = []
    }
    this.cadastrando = false
  }

  create() {
    this.cadastrando = true
    this.check_for_empty()
    if (this.continue_not_allowed){
      this.empty_values_toastController()
      return
    }

    this.add_values_into_array()

    this.clear()
    this.navigateTo_Principal()
  }

  private add_values_into_array() {
    //variáveis que determinam se a marca/modelo existem.
    let brand_in = false; let model_in = false

    //loop através de todas as marcas de carros salvas no localStorage.
    for (let brand of this.carros) {
      if (brand.nome == this.brand.nome) {

        for (let model of brand.modelos) {
          if (model.nome == this.model.nome) {
            //se a marca e o modelo já existirem, apenas adicione à lista existente.
            model.carros.push(Object.assign({}, this.car))
            model_in = true
            break
          }
        }
        //se depois do segundo loop o modelo selecionado não existir, adicione-o.
        if (!model_in) {
          this.model['carros'].push(Object.assign({}, this.car))
          brand['modelos'].push(Object.assign({}, this.model))
        }
        brand_in = true
        break
      }
    }
    //se depois do loop a marca selecionada não estiver salva, adicione-a.
    if (!brand_in) {
      this.model['carros'].push(Object.assign({}, this.car))
      this.brand['modelos'].push(Object.assign({}, this.model))
      this.carros.push(Object.assign({}, this.brand))
    }
    localStorage.setItem("carros", JSON.stringify(this.carros))
  }

  check_for_empty() {
    if(this.brand.nome != '') {
        if(this.car.preco != '') {
          if(this.model.nome != ''){
            if(this.car.descricao != ''){
              this.continue_not_allowed = false
            }
          }
        }
      }
    }

  brandChange() {
    if (!this.cadastrando) {
      this.selected_brand_models = []

      this.model.nome = ""
      this.model.foto = ""

      for (let stored_car of this.stored_cars[this.brand['nome']]) {
        this.selected_brand_models.push(stored_car.model)
      }
    }
  }

  modelChange() {
    if (!this.cadastrando && this.model.nome != "") {

      this.model.foto = ""
      this.model.foto = this.retrievePhoto(this.brand.nome, this.model.nome)
    }
  }

  retrievePhoto(brand: string, model: string) {
    return this.stored_cars[brand].find((e) => e.model == model).url
  }

  async empty_values_toastController(){
    const toast = await this.toastController.create(
      {
        message: 'Por favor, complete todos os campos acima',
        duration: 3000,
        color: 'green'
      }
    )
    toast.present()
  }

  clear() {
    this.continue_not_allowed  = true
    this.brand.nome = ""
    this.brand.modelos = []
    this.model.nome = ""
    this.model.carros = []
    this.model.foto = ""
    this.car.descricao = ""
    this.car.preco = ""
  }

  navigateTo_Principal() {
    this.router.navigate(['tabs/tab1']);
  }
}
