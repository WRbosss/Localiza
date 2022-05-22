import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private router: Router,public alertController: AlertController) {}
  
  button_Voltar(){
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
