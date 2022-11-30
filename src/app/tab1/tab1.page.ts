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
  categoryMode = false;
  categories: any[] = [
    {category:'smartphones', traduction: 'Téléphonies'},
    {category:'laptops', traduction: 'Ordinateurs'},
    {category:'fragrances', traduction: 'Parfums'},
    {category:'skincare', traduction: 'Soins du visage'},
  ];

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

  private generateProducts(){
    this.service.getSkipProduct(this.products.length).subscribe(response => this.products.push(...response.products));
  }

  onIonInfinite(ev: any) {
    this.generateProducts();
    if(this.products.length == 100){
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

  selectCategory(category: string){
    this.categoryMode = true
    console.log("category mode", this.categoryMode);
    this.products = []
    this.service.getProductByCategory(category).subscribe(response => this.products = [...response.products])
  }

  resetCategoryMode(){    
    this.categoryMode = false;
    console.log("category mode", this.categoryMode);
    this.products = [];
    this.getProducts();
  }
}
