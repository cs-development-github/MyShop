import { Component } from '@angular/core';
import { ShopService } from '../services/shop.service';

import { InfiniteScrollCustomEvent, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  products: any[] = [];
  count: number = 10;

  constructor(
    private service: ShopService,
    private toastController: ToastController,
  ) {}

  ngOnInit(){
    this.getProducts()
  }

  private getProducts(){
    this.service.getAllProducts().subscribe(response => this.products = [...response.products])
  }

  private generateItems(){
    this.service.getSkipProduct(this.count).subscribe(response => this.products.push(...response.products));
  }

  onIonInfinite(ev: any) {
    this.generateItems();
    this.count += 10;
    if(this.count >= 110){
      this.presentToast('bottom');
    }    
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Vous êtes arriver en bas',
      duration: 2500,
      position: position
    });

    await toast.present();
  }
}
