import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private router: Router) {}

  button_TelaCadastro(){
    this.router.navigate(['tabs/tab2']);
  }
  button_Estoque(){
    document.getElementById("card").innerHTML=""
    document.getElementById("card").innerHTML=`<ion-card>
    <img src="https://secure-developments.com/commonwealth/brasil/gm_forms/assets/front/images/jellys/61eb1d424183d.png" />
    <ion-card-header>
      <ion-card-subtitle>Marca</ion-card-subtitle>
      <ion-card-title>Modelo</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      Farol de neblina, Direção Elétrica, Comando de áudio no volante, Banco bi-partido, Controle de estabilidade, Distribuição eletrônica de frenagem, Kit Multimídia, Pára-choques na cor do veículo.
    </ion-card-content>
    <h1 id="precoCard">R$ 120.000,00</h1>
    <ion-button expand="block"
    fill="outline" id="buttonD" color="greenyellow">
      <ion-icon slot="end" name="arrow-back-outline"></ion-icon>
    </ion-button>
  </ion-card>`
  }
  button_TelaDeCompra(){
    this.router.navigate(['tabs/tab3']);
  }
}
