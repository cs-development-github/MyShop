import { Component } from '@angular/core';
import { ShopService } from '../services/shop.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  products: any[] = [];

  constructor(
    private service: ShopService
  ) {}

  ngOnInit(){
    this.getProducts()
  }

  private getProducts(){
    this.service.getAllProducts().subscribe(response => this.products = [...response.products])
  }

}
