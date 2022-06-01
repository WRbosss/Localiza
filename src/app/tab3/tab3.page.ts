import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { parseISO } from 'date-fns';
import { format } from 'date-fns';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  a_car: any

  initial_date_not_null: Boolean = false
  initial_date_value = this.return_currentDate()
  initial_date: String = ''
  initial_date_active = false

  final_date_not_null: Boolean = false
  final_date_value = this.return_currentDate()
  final_date: String = ''
  final_date_active = false
  //dada

  constructor(private router: Router, public alertController: AlertController, private route: ActivatedRoute) { 
    this.route.queryParams.subscribe(params => {
      if(this.router.getCurrentNavigation().extras.state){
        this.a_car = this.router.getCurrentNavigation().extras.state
        
      }
      console.log(this.a_car)
    })

  }

return_currentDate( ){ return format(new Date(), 'yyyy-MM-dd') + "T" + format(new Date(), 'HH:mm:ss') + "Z" }

initialdate_changed(date_value){
  this.initial_date_value = date_value;
  this.initial_date = format(parseISO(date_value), 'HH:mm, dd MMM')
  this.initial_date_active = false

  this.initial_date_not_null = true
}

finaldate_changed(date_value){
  this.final_date_value = date_value;
  this.final_date = format(parseISO(date_value), 'HH:mm, dd MMM')
  this.final_date_active = false

  this.final_date_not_null = true
}

  button_Voltar() {

    this.initial_date = ''
    this.final_date = ''

    this.a_car = null

    this.initial_date_not_null = false
    this.final_date_not_null = false
    this.router.navigate(['tabs/tab1']);
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Onix de 100k',
      subHeader: '',
      message: 'Tem certeza que deseja alugar esse carro',
      buttons: [
        {
          text: 'Não Aceito',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Aceito',
          handler: () => {
            this.router.navigate(['tabs/tab1']);
          }
        }
      ]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async presentAlert1() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Tempo Aluguel',
      message: 'Tem certeza que deseja alugar esse carro',

      buttons: [
        {
          text: 'Não Aceito',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Aceito',
          handler: () => {
            this.router.navigate(['tabs/tab1']);
          }
        }
      ]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
}
