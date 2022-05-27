import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private router: Router) { }

  carros: any = []

  ionViewDidEnter() {
    this.carros = JSON.parse(localStorage.getItem('carros'))

    if (this.carros == null) { this.carros = [] }
  }

  navigateTo_Cadastro() {
    this.router.navigate(['tabs/tab2']);
  }
  navigateTo_TelaCompra(a_car: any) {
    let navigationExtras: NavigationExtras = {
      state: {
        car: a_car
      }
    }

    this.router.navigate(['tabs/tab3'], navigationExtras);
  }
 
}
