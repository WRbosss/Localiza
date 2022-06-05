import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { parseISO, addDays, differenceInDays } from 'date-fns';
import { format } from 'date-fns';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  a_car: any

  min_initial_date: String = format(new Date(), 'yyyy-MM-dd')
  min_final_date: any

  private carros: any;

  initial_date_not_null: Boolean = false
  initial_date_value = this.return_currentDate()
  initial_date: String = ''
  initial_date_active = false

  final_date_not_null: Boolean = false
  final_date_value = this.return_currentDate()
  final_date: String = ''
  final_date_active = false

  car_price: any

  constructor(private router: Router, public alertController: AlertController, private route: ActivatedRoute) { 
    this.route.queryParams.subscribe(params => {
      if(this.router.getCurrentNavigation().extras.state){
        this.a_car = this.router.getCurrentNavigation().extras.state['car']
      }
      else{
        this.button_Voltar()
      }
    })
  }

return_currentDate( ){ 
  return format(new Date(), 'yyyy-MM-dd') + "T" + format(new Date(), 'HH:mm:ss') + "Z" 
}

initialdate_changed(date_value){
  this.initial_date_value = date_value;

  let parsedISO = parseISO(this.initial_date_value)

  this.initial_date = format(parsedISO, 'HH:mm, dd MMM')

  let added_day = addDays(new Date(date_value), 1)
  this.min_final_date = format(added_day, 'yyyy-MM-dd')
  this.final_date_value = this.min_final_date + 'T' + format(added_day, 'HH:mm:ss') + 'Z'

  this.initial_date_active = false

  this.initial_date_not_null = true
}

finaldate_changed(date_value){
  this.final_date_value = date_value;
  this.final_date = format(parseISO(date_value), 'HH:mm, dd MMM')
  this.final_date_active = false

  this.final_date_not_null = true
  this.set_car_price()
}

button_Voltar() {
    this.initial_date = ''
    this.final_date = ''

    this.a_car = null
    this.car_price = null

    this.initial_date_active = false
    this.final_date_active = false

    this.initial_date_value = this.return_currentDate()
    this.final_date_value = this.return_currentDate()

    this.min_final_date = null

    this.initial_date_not_null = false
    this.final_date_not_null = false
    this.router.navigate(['tabs/tab1']);
}

set_car_price(){
  let days = differenceInDays(new Date(this.final_date_value), new Date(this.initial_date_value))
  this.car_price ="R$" + (days * this.a_car.preco)
}

remove_from_storage(){
    //retorna os carros atuais do localStorage em uma lista.
    this.carros = JSON.parse(localStorage.getItem('carros'))

    //iterando por cada marca.
    for(let brand of this.carros){
      if(brand.nome == this.a_car.marca){

        //iterando por cada modelo ao encontrar a marca.
        for(let model of brand.modelos){
          if(model.nome == this.a_car.modelo){
            
            //iterando por cada carro ao encontrar o modelo.
            for(let car of model.carros){
              if(car.descricao == this.a_car.descricao && car.preco == this.a_car.preco){
                model.carros.splice(model.carros.indexOf(car), 1)
                localStorage.setItem("carros", JSON.stringify(this.carros))
                return
              }
            }
          }
        }
      }
    }
  }

  async confirm_alertController() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: this.a_car.marca+ ' '+ this.a_car.modelo,
      message: 'Tem certeza que deseja alugar este carro?',
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.remove_from_storage();

            this.button_Voltar();
          }
        }
      ]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }
}
