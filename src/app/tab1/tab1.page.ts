import { Component } from '@angular/core';
import { ShopService } from '../services/shop.service';

import { InfiniteScrollCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  products: any[] = [];
  count: number = 0;

  constructor(
    private service: ShopService
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
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }
}
